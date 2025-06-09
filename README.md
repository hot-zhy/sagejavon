# SageJavon: A Personalized AI Tutor for Java Programming

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
![image](https://github.com/user-attachments/assets/53cfa4a0-96b3-45bc-b683-c613b2692e47)
![image](https://github.com/user-attachments/assets/26bfab58-03ec-49fd-a3bc-c08a5df06119)


### Learn

- AI-powered concept explanation and guided learning

· knowledge Q&A with RAG
![image](https://github.com/user-attachments/assets/f9a750fc-9130-42f2-b8e0-01b5536851eb)


· RAG backend
![image](https://github.com/user-attachments/assets/4017b398-4188-4b42-b042-a70bb22ad620)
![image](https://github.com/user-attachments/assets/8268e24f-893c-4089-80eb-92ac07d68520)


· programming tutor
![image](https://github.com/user-attachments/assets/3c933b0e-e891-4845-a5cf-7e2f62ca8ef4)



### Practice Module

· practice statistics and daily recommendation exercises
![image](https://github.com/user-attachments/assets/1323157f-a16f-4089-8eca-f974b7472026)

· choice exercises
![image](https://github.com/user-attachments/assets/3377bb19-7b6d-4041-99de-e9baec14de7a)

· programming exercises
![image](https://github.com/user-attachments/assets/76a7ca49-c103-4729-a9aa-18170e889e6e)

### Evaluate Module

- Code correctness, efficiency, and knowledge mastery evaluation

- Auto-generated Java coding tasks and interactive feedback

· code exercise and evaluation result
![image](https://github.com/user-attachments/assets/8398a786-2485-4b43-af5a-08bcdf2cebf3)

· evaluation result
![image](https://github.com/user-attachments/assets/59d244af-ce11-4fd0-b771-67b95f4794c8)
![image](https://github.com/user-attachments/assets/a7e1a762-d356-4d68-8c3b-d9f6141dd1f6)


### Support Module

· student's personal knowledge graph and his/her learning report(suggesstions and learning path)
![image](https://github.com/user-attachments/assets/5301457a-876d-4a8e-a752-7021102606d1)


· learning report downloaded:
![image](https://github.com/user-attachments/assets/2402165d-f99b-4867-a98a-d265462dfc4c)

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
