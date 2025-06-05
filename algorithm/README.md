# SageJavon: Backend Algorithm Implementation

This project is an modifiedversion of [gpt-open/rag-gpt](https://github.com/gpt-open/rag-gpt), which improves both the retrieval pipeline and the user interface. SageJavon leverages RAG (Retrieval-Augmented Generation) techniques to provide more accurate, context-aware responses by integrating customized educational knowledge sources.

------

### 🚀 How to Run

```

pip install -r requirements.txt
python create_sqlite_db.py

python rag_gpt_app.py
```

------

### 📊 RAG Evaluation & Data Analysis

The evaluation and analysis of our enhanced RAG pipeline are conducted using [Ragas](https://github.com/explodinggradients/ragas). All related experiments and code can be found in:

```
sageJavon-flask/dataanalysis/final-exam-ragas
```

------

### 🔍 Key Enhancements in Retrieval Pipeline

Modified retrieval components are located in:

```
server/rag/post_retrieval
server/rag/pre_retrieval
```

------

### 🧠 Trained GIKT Model

Our optimized GIKT model is stored in:

```
server/app/model-1
```

------

**Note:** Due to privacy concerns involving student dialog and exercise data, certain datasets are not open-sourced.
