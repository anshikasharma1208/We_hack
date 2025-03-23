from fastapi import APIRouter, Depends
from pymongo import MongoClient
import os
from backend.app.database import get_db

router = APIRouter()

@router.get("/quiz/")
async def get_questions(difficulty: str = None, db=Depends(get_db)):
    query = {"difficulty": difficulty} if difficulty else {}
    questions = list(db.quiz_questions.find(query, {"_id": 0}))  # Exclude _id field
    return {"questions": questions}
