from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import google.generativeai as genai  # Gemini API
import os
from dotenv import load_dotenv
import nltk
nltk.download("punkt")
from nltk.tokenize import sent_tokenize

# ✅ Load environment variables
load_dotenv()

# ✅ Retrieve the Gemini API key
gemini_api_key = os.getenv("GEMINI_API_KEY")
if not gemini_api_key:
    raise ValueError("Gemini API key is missing! Set GEMINI_API_KEY in your .env file or environment.")

# ✅ Set up Gemini API
genai.configure(api_key=gemini_api_key)

router = APIRouter()

class YouTubeVideo(BaseModel):
    url: str
    num_flashcards: int = 5
    num_mcqs: int = 5

from youtube_transcript_api import YouTubeTranscriptApi
import re

def extract_video_id(video_url):
    """Extracts the video ID from a YouTube URL."""
    match = re.search(r"(?:v=|\/)([0-9A-Za-z_-]{11})", video_url)
    return match.group(1) if match else None

def generate_notes_from_youtube(video_url: str):
    """Extracts the transcript and summarizes it using Gemini API."""
    
    video_id = extract_video_id(video_url)
    if not video_id:
        raise HTTPException(status_code=400, detail="Invalid YouTube URL.")

    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        transcript_text = " ".join([entry["text"] for entry in transcript])
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching transcript: {str(e)}")

    model = genai.GenerativeModel("gemini-1.5-pro-latest")
    prompt = f"Summarize the following transcript into concise key notes:\n\n{transcript_text}"
    
    response = model.generate_content(prompt)
    return response.text.strip() if response.text else ""


@router.post("/youtube-to-flashcards/")
async def youtube_to_flashcards(video: YouTubeVideo):
    """Extracts notes from a YouTube video and generates flashcards."""
    notes = generate_notes_from_youtube(video.url)

    if not notes:
        raise HTTPException(status_code=400, detail="Failed to extract notes from video.")
    import nltk
    nltk.data.path.append("C:\\Users\\dell\\AppData\\Roaming\\nltk_data")

    sentences = sent_tokenize(notes)
    num_flashcards = min(video.num_flashcards, len(sentences))

    flashcards = [
        {
            "id": i + 1,
            "content": sentences[i].strip(),
            "next_review": None,
            "easiness_streak": 0
        }
        for i in range(num_flashcards)
    ]

    return {"message": "Flashcards generated from YouTube video", "flashcards": flashcards}

@router.post("/youtube-to-mcqs/")
async def youtube_to_mcqs(video: YouTubeVideo):
    """Extracts notes from a YouTube video and generates MCQs."""
    notes = generate_notes_from_youtube(video.url)

    if not notes:
        raise HTTPException(status_code=400, detail="Failed to extract notes from video.")

    model = genai.GenerativeModel("gemini-pro")
    prompt = f"Generate {video.num_mcqs} MCQs based on the following content:\n\n{notes}\n\nEach question should have 4 options and one correct answer. Format as JSON: {{'question': '...', 'options': ['A', 'B', 'C', 'D'], 'answer': 'A'}}."

    response = model.generate_content(prompt)

    try:
        mcqs = eval(response.text)  # Convert generated JSON-like string to Python dict
        if not isinstance(mcqs, list):
            raise ValueError
    except:
        raise HTTPException(status_code=500, detail="Failed to parse MCQs.")

    return {"message": "MCQs generated from YouTube video", "mcqs": mcqs}

# ✅ List available models only when running the script directly
if __name__ == "__main__":
    def list_available_models():
        models = genai.list_models()
        for model in models:
            print(f"Model: {model.name}, Methods: {model.supported_generation_methods}")

    list_available_models()
