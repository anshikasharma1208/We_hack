import random
import os
import openai
from fastapi import APIRouter, HTTPException, UploadFile, File
from youtube_transcript_api import YouTubeTranscriptApi
from app.database import flashcards_collection
from app.pdf_extractor import extract_text_from_pdf
from app.config import OPENAI_API_KEY
from bson import ObjectId

router = APIRouter()
openai.api_key = OPENAI_API_KEY  # Load OpenAI API key

# 🟢 Function to summarize text using OpenAI
def generate_notes(transcription):
    """Summarizes the transcript into key points using OpenAI."""
    prompt = f"Summarize the following transcript into key points:\n{transcription}"
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "system", "content": prompt}]
    )
    return response["choices"][0]["message"]["content"]

# 🟢 Function to generate flashcards from extracted text
async def generate_flashcards(user_id: int, extracted_text: str, source: str):
    """Generates MCQ flashcards from extracted text (PDF or YouTube)."""
    questions = extracted_text.split("\n")

    flashcards = []
    for i in range(0, len(questions) - 1, 2):
        question = questions[i]
        correct_answer = questions[i + 1] if i + 1 < len(questions) else "N/A"

        # ✅ Generate 3 wrong options randomly
        all_answers = [questions[j] for j in range(1, len(questions), 2) if j != i + 1]
        wrong_options = random.sample(all_answers, min(3, len(all_answers)))

        options = wrong_options + [correct_answer]
        random.shuffle(options)

        flashcard = {
            "user_id": user_id,
            "topic": f"{source} Extracted",
            "question": question,
            "options": options,
            "correct_option_index": options.index(correct_answer),
            "difficulty": "Medium",
            "mode": "mcq",
            "next_review": None
        }
        flashcards.append(flashcard)
    
    await flashcards_collection.insert_many(flashcards)
    return {"message": f"MCQ Flashcards extracted from {source} and stored", "count": len(flashcards)}

# 🟢 API Endpoint: Upload PDF and Generate Flashcards
@router.post("/upload/pdf/")
async def upload_pdf(user_id: int, file: UploadFile = File(...)):
    """Extracts text from a PDF, generates MCQs, and stores them."""
    content = await file.read()
    pdf_path = f"temp_{user_id}.pdf"
    
    with open(pdf_path, "wb") as f:
        f.write(content)

    extracted_text = extract_text_from_pdf(pdf_path)
    os.remove(pdf_path)  # ✅ Cleanup file

    return await generate_flashcards(user_id, extracted_text, "PDF")

# 🟢 API Endpoint: Generate Flashcards from YouTube Video
@router.post("/upload/youtube/")
async def upload_youtube(user_id: int, youtube_url: str):
    """Fetches a YouTube transcript, generates notes, then MCQ flashcards."""
    try:
        video_id = youtube_url.split("v=")[-1].split("&")[0]
        transcript = YouTubeTranscriptApi.get_transcript(video_id)

        full_text = " ".join([entry["text"] for entry in transcript])
        summarized_notes = generate_notes(full_text)

        return await generate_flashcards(user_id, summarized_notes, "YouTube Video")

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error extracting transcript: {str(e)}")
