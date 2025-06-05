# 📘 SageJavon: A Personalized AI Tutor for Java Programming

## 🧩 Project Structure

- `frontend/`: Web front-end implemented with **Vue 3 + TypeScript**
- `backend/`: Web back-end implemented with **Spring Boot + MyBatis-Plus**
- `database`: Uses **MySQL** for structured storage of users, questions, and logs
- `algorithm/`: Contains core **Python** modules for:
  - RAG (Retrieval-Augmented Generation)
  - Code auto-evaluation
  - Knowledge recommendation
  - GIKT-based student modeling
     Built with **Flask** framework

------

## 🛠️ Setup & Run

### Frontend

```
cd frontend
npm install
npm run dev
```

### Backend

```
# Open with IntelliJ IDEA or compatible IDE
# Ensure MySQL connection settings are configured in application.yml
Run the Spring Boot application
```

### Algorithm (Flask-based AI engine)

This module builds upon [gpt-open/rag-gpt](https://github.com/gpt-open/rag-gpt) with improvements to the **retrieval pipeline**, **evaluation metrics**, and **educational adaptation**.

```
cd algorithm
pip install -r requirements.txt
python create_sqlite_db.py
python rag_gpt_app.py
```

------

## 📊 Evaluation and Data Analysis

- We adopt [Ragas](https://github.com/explodinggradients/ragas) to evaluate the enhanced RAG system.
- All CSV results and evaluation scripts are located at:

```
algorithm/dataanalysis/final-exam-ragas/
```

- Additional scripts for follow-up quality, response realism, and effectiveness are available in:

```
algorithm/evaluation/
```

> ⚠️ *Due to privacy restrictions, student dialogues and personalized datasets are not publicly released.*

------

## 🔍 Key AI Components

### RAG Pipeline Enhancements

```
server/rag/pre_retrieval/
server/rag/post_retrieval/
```

### Trained GIKT Model (for student knowledge tracing)

```
server/app/model-1/
```

------

## 🧪 System Modules with Screenshots 

### Learn

- AI-powered concept explanation and guided learning

### Practice Module

- Auto-generated Java coding tasks and interactive feedback

### Evaluate Module

- Code correctness, efficiency, and knowledge mastery evaluation

### Support Module

- Personalized guidance and resource recommendation based on GIKT and user profiles

------

## 🌟 System Highlights

- Integrated **RAG-based LLM engine** for Java domain tutoring
- Lightweight yet modular architecture (Vue + Flask + SpringBoot)
- Adaptive recommendation via **GIKT student modeling**
- Evaluation framework using **Ragas** + custom metrics
- End-to-end reproducibility for research comparison

------

## ☁️ Deployment

> The system has been continuously deployed and maintained for over **384 days**. An upgraded public demo version of SageJavon is currently under development and will be available **soon**.

------

## 🔗 Referenced GitHub Projects

- [gpt-open/rag-gpt](https://github.com/gpt-open/rag-gpt)
- [ApexEDM/GIKT](https://github.com/ApexEDM/GIKT) — *GIKT: A Graph-based Interaction Model for Knowledge Tracing*