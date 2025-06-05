import openai

def simulate_student_reply(prompt: str, model="gpt-3.5-turbo"):
    system_prompt = "You are a beginner Java student. Respond to the tutor's message as if you're trying to understand it."
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": prompt}
    ]
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=0.7
    )
    return response['choices'][0]['message']['content']

def is_kbr_response(text: str) -> bool:
    if any(x in text.lower() for x in ["oh i see", "so that means", "let me try again", "i think the error was"]):
        return True
    return False
