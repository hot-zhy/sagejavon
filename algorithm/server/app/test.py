import os
import torch
import numpy as np
from params import *

from gikt import GIKT
import os
import time
import numpy as np
from scipy import sparse
from gikt import GIKT
from params import *
from util import gen_gikt_graph, build_adj_list


# 获取当前脚本的绝对路径
script_dir = os.path.dirname(__file__)

# 使用绝对路径加载模型和数据文件
model_path = os.path.join(script_dir, 'model-1/result.pth')
qq_table_path = os.path.join(script_dir, 'data/qq_table.npz')
qs_table_path = os.path.join(script_dir, 'data/qs_table.npz')
ss_table_path = os.path.join(script_dir, 'data/ss_table.npz')
question2idx_path = os.path.join(script_dir, 'data/question2idx.npy')
idx2question_path = os.path.join(script_dir, 'data/idx2question.npy')

qq_table = sparse.load_npz(qq_table_path).toarray()
qs_table = sparse.load_npz(qs_table_path).toarray()
ss_table = sparse.load_npz(ss_table_path).toarray()
question2idx = np.load(question2idx_path, allow_pickle=True).item()
idx2question = np.load(idx2question_path, allow_pickle=True).item()
num_question = torch.tensor(qs_table.shape[0], device=DEVICE)
num_skill = torch.tensor(qs_table.shape[1], device=DEVICE)

q_neighbors_list, s_neighbors_list = build_adj_list()
q_neighbors, s_neighbors = gen_gikt_graph(
    q_neighbors_list, s_neighbors_list, 4, 10)
q_neighbors = torch.tensor(q_neighbors, dtype=torch.int64, device=DEVICE)
s_neighbors = torch.tensor(s_neighbors, dtype=torch.int64, device=DEVICE)

# 初始化模型
model = GIKT(
    num_question, num_skill, q_neighbors, s_neighbors, qs_table
).to(DEVICE)

model.load_state_dict(torch.load(model_path))
