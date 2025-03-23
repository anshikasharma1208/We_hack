from pydantic import BaseModel, EmailStr
from typing import Optional
from bson import ObjectId

# Custom Pydantic field for handling MongoDB ObjectId
class PyObjectId(str):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not isinstance(v, ObjectId):
            raise ValueError("Not a valid ObjectId")
        return str(v)

class Flashcard(BaseModel):
    id: PyObjectId  # Added ObjectId support
    user_id: int  # Kept as int
    topic: str
    question: str
    answer: str
    difficulty: str  # "Easy", "Medium", "Hard"
    mode: str  # "normal" or "quiz"
    next_review: Optional[str] = None  # Can be a date string

class UserSignup(BaseModel):
    name: str
    email: EmailStr
    password: str  # Fixed incorrect syntax

class UserInDB(UserSignup):
    hashed_password: str  # Store hashed passwords

