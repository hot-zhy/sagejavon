import mysql.connector
import json
from decimal import Decimal
from datetime import datetime
import os
import numpy as np
import torch.nn.functional as F
import torch


def convert_to_dict(cursor, row):
    """Convert MySQL row to dictionary with handling for Decimal type."""
    d = dict(zip(cursor.column_names, row))
    for key, value in d.items():
        if isinstance(value, Decimal):
            d[key] = float(value)  # Convert Decimal to float
    return d


def fetch_exercise_records(student_id):
    try:
        # 连接到 MySQL 数据库
        conn = mysql.connector.connect(
            host="mysql.mysql",
            user="root",
            password=os.getenv('MYSQL_PASSWORD'),
            database="sage_javon",
            port=3306
        )

        if conn.is_connected():
            print('Connected to MySQL database')

        # 创建游标对象，用于执行查询
        cursor = conn.cursor(dictionary=True)  # 使用 dictionary=True 返回字典形式的结果

        # 执行查询 exercise_record 表
        query = "SELECT * FROM exercise_record WHERE student_id = %s"
        cursor.execute(query, (student_id,))
        exercise_records = cursor.fetchall()

        # 准备存放最终结果的列表
        exercise_record_list = []

        # 遍历每条答题记录
        for exercise_record in exercise_records:
            # 假设 record_id 是 exercise_record 表中的记录ID字段
            record_id = exercise_record['id']
            exercise_id = exercise_record['exercise_id']
            score = exercise_record['score']
            submit_time = exercise_record['submit_time']
            exercise_type = exercise_record['type']

            # 查询 exercise_knowledge 表，找到所有相关的 knowledge_id
            query = "SELECT knowledge_id FROM exercise_knowledge WHERE exercise_id = %s"
            cursor.execute(query, (exercise_id,))
            exercise_knowledge_rows = cursor.fetchall()

            # 准备存放知识概念的列表
            knowledge_concepts = []

            # 遍历每个 knowledge_id，并查询 knowledge 表获取对应的 knowledge 字段
            for exercise_knowledge_row in exercise_knowledge_rows:
                knowledge_id = exercise_knowledge_row['knowledge_id']

                # 查询 knowledge 表，获取 knowledge 字段内容
                query = "SELECT knowledge FROM knowledge WHERE id = %s"
                cursor.execute(query, (knowledge_id,))
                knowledge_row = cursor.fetchone()

                if knowledge_row:
                    knowledge = knowledge_row['knowledge']

                    # 构建知识概念对象
                    knowledge_concept = {
                        'knowledgeId': knowledge_id,
                        'knowledge': knowledge
                    }
                    knowledge_concepts.append(knowledge_concept)

            # 转换 submit_time 为 ISO 格式的字符串
            submit_time_str = submit_time.isoformat()

            # 构建每个 exercise record 的 JSON 对象
            exercise_record_json = {
                'recordId': record_id,
                'exerciseId': exercise_id,
                'knowledgeConcept': knowledge_concepts,
                'score': float(score),
                'submitTime': submit_time_str,
                'type': exercise_type
            }

            exercise_record_list.append(exercise_record_json)

        # 构建最终的 JSON 数据结构
        result = {
            'exerciseRecordList': exercise_record_list
        }
        return result

        # 打印 JSON 数据（或者可以返回给调用者）

    except mysql.connector.Error as e:
        print("Error connecting to MySQL database:", e)

    finally:
        # 关闭游标和数据库连接
        if 'cursor' in locals() and cursor:
            cursor.close()
        if 'conn' in locals() and conn.is_connected():
            conn.close()
            print('MySQL connection closed')

def state2tensor(state_str):
    state_list = list(map(float, state_str.replace("\n", "").strip('[]').split()))
    # 将列表转换为 NumPy 数组
    state_array = np.array(state_list)
    # 将 NumPy 数组转换为 PyTorch 张量
    state_tensor = torch.tensor(state_array)
    return state_tensor

# 计算知识状态的相似度，获取相似度高的前10个学生
def cal_stu_knowledge_state_similarity(student_id):
    try:
        # 连接到 MySQL 数据库
        conn = mysql.connector.connect(
            host="mysql.mysql",
            user="root",
            password=os.getenv('MYSQL_PASSWORD'),
            database="sage_javon",
            port=3306
        )

        if conn.is_connected():
            print('Connected to MySQL database')

        # 创建游标对象，用于执行查询
        cursor = conn.cursor(dictionary=True)

        # 获取指定学生的知识状态
        query = "SELECT knowledge_state FROM student WHERE id = %s"
        cursor.execute(query, (student_id,))
        student_knowledge_state_row = cursor.fetchone()

        if not student_knowledge_state_row:
            raise ValueError(f"No student found with ID {student_id}")
        
        student_knowledge_state = student_knowledge_state_row['knowledge_state']

            # 获取其他所有学生的知识状态
        query = "SELECT id, knowledge_state FROM student WHERE id != %s"
        cursor.execute(query, (student_id,))
        other_students = cursor.fetchall()

        similarity_dict = {}

        threshold = 0.95 # 设置相似度阈值

        for other_student in other_students:
            other_student_id = other_student['id']
            other_student_knowledge_state = other_student['knowledge_state']

            if other_student_knowledge_state != None:
                # 计算二者的余弦相似度
                similarity = F.cosine_similarity(
                    state2tensor(student_knowledge_state),
                    state2tensor(other_student_knowledge_state),
                    dim=0
                )
                if similarity > threshold:
                    similarity_dict[other_student_id] = similarity
            # 将学生 ID 和相似度保存到字典 similarity_dict 中

        # 相似度降序排序，返回
        sorted_similar_students = sorted(similarity_dict.items(), key=lambda x: x[1], reverse=True)
        return sorted_similar_students
    except mysql.connector.Error as e:
        print("Error connecting to MySQL database:", e)

    finally:
        # 关闭游标和数据库连接
        if 'cursor' in locals() and cursor:
            cursor.close()
        if 'conn' in locals() and conn.is_connected():
            conn.close()
            print('MySQL connection closed')


# 获取指定学生的knowledge_state
def get_knowledge_state_by_id(student_id):
    try:
        # 连接到 MySQL 数据库
        conn = mysql.connector.connect(
            host="mysql.mysql",
            user="root",
            password=os.getenv('MYSQL_PASSWORD'),
            database="sage_javon",
            port=3306
        )

        if conn.is_connected():
            print('Connected to MySQL database')

        # 创建游标对象，用于执行查询
        cursor = conn.cursor(dictionary=True)

        # 获取指定学生的知识状态
        query = "SELECT knowledge_state FROM student WHERE id = %s"
        cursor.execute(query, (student_id,))
        student_knowledge_state_row = cursor.fetchone()

        if not student_knowledge_state_row:
            raise ValueError(f"No student found with ID {student_id}")
        
        student_knowledge_state = student_knowledge_state_row['knowledge_state']
        return student_knowledge_state

    except mysql.connector.Error as e:
        print("Error connecting to MySQL database:", e)

    finally:
        # 关闭游标和数据库连接
        if 'cursor' in locals() and cursor:
            cursor.close()
        if 'conn' in locals() and conn.is_connected():
            conn.close()
            print('MySQL connection closed')