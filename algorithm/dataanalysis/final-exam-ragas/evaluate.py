import os
import ast
import pandas as pd
import logging
from datasets import Dataset
from dotenv import load_dotenv
from ragas import evaluate
from ragas.metrics import (
    context_precision,
    context_recall,
    faithfulness,
    answer_relevancy,
)
import langchain_community.chat_models.zhipuai as zp
from zhipu_embeddings import ZhipuEmbeddings

# 初始化日志配置
logging.basicConfig(
    filename="process_log.txt",
    filemode="a",
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

# 加载环境变量
load_dotenv()

def safe_literal_eval(val):
    """安全解析列表字符串"""
    if isinstance(val, str) and val.strip().startswith("["):
        try:
            return ast.literal_eval(val)
        except Exception as e:
            logging.warning(f"解析retrieved_contexts失败: {val}, 错误: {e}")
            return []
    return val

# 输入输出路径
input_dir = "./output"
output_dir = "./input"
os.makedirs(output_dir, exist_ok=True)


import time

# 重试逻辑包装
def safe_evaluate_with_retry(dataset, max_retries=3, delay=5):
    for attempt in range(max_retries):
        try:
            return evaluate(
                dataset,
                llm=zhipu_model,
                embeddings=zhipu_embeddings,
                metrics=[
                    context_precision,
                    faithfulness,
                    answer_relevancy,
                    context_recall,
                ],
                raise_exceptions=True
            )
        except Exception as e:
            logging.warning(f"第 {attempt+1} 次评估失败: {e}")
            time.sleep(delay)
    raise RuntimeError(f"多次尝试后仍然失败")


# 处理每个 CSV 文件
for filename in os.listdir(input_dir):
    if filename.endswith(".csv"):
        input_path = os.path.join(input_dir, filename)
        output_path = os.path.join(output_dir, filename.replace(".csv", "_result.csv"))

        logging.info(f"开始处理文件: {filename}")
        print(f"🔍 Evaluating file: {filename}")

        try:
            df = pd.read_csv(input_path)

            # 解析retrieved_contexts字段为list
            df["retrieved_contexts"] = df["retrieved_contexts"].apply(safe_literal_eval)

            # 将 response 字符串追加到 retrieved_contexts 末尾
            def append_response(row):
                ctx = row["retrieved_contexts"]
                response = str(row["response"]) if pd.notna(row["response"]) else "ERROR"
                ctx.append(response)
                return ctx

            df["retrieved_contexts"] = df.apply(append_response, axis=1)

            # 转为Ragas格式
            ragas_ds = Dataset.from_pandas(df)

            # 获取 API_KEY（可自行从.env加载）
            zhipuai_key = "6e5294aa63fa49d186f994c849e1def8.detSDLFawmdzZKV2"
            assert zhipuai_key is not None

            # 初始化模型
            zhipu_model = zp.ChatZhipuAI(
                api_key=zhipuai_key,
                model="glm-4-air"
            )
            zhipu_embeddings = ZhipuEmbeddings(api_key=zhipuai_key)

            # 执行 RAGAS 评估
            result = safe_evaluate_with_retry(ragas_ds)


            df_result = result.to_pandas()
            df_result.to_csv(output_path, index=False)
            logging.info(f"✅ 成功保存结果至: {output_path}")
            print(f"✅ Saved result to: {output_path}")

        except Exception as e:
            logging.error(f"❌ 处理失败 {filename}: {e}")
            print(f"❌ Error processing {filename}: {e}")
