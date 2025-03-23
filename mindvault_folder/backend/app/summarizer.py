import openai
from app.config import OPENAI_API_KEY  # Import API key from config.py

openai.api_key = OPENAI_API_KEY

def generate_notes(transcription):
    """Uses OpenAI to summarize the transcript into key points."""
    prompt = f"Summarize the following transcript into key points:\n{transcription}"
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "system", "content": prompt}]
    )
    return response["choices"][0]["message"]["content"]
