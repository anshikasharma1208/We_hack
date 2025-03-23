from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import logging
import os
app = FastAPI()

# Allow React frontend to access the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with your React URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load JSON data

@app.get("/quiz")
def get_quiz_data():
    try:
        file_path = "quiz-result.json"
        if not os.path.exists(file_path):
            logging.error(f"❌ ERROR: {file_path} not found!")
            return {"error": "Quiz data file not found"}
        
        with open(file_path, "r") as file:
            data = json.load(file)

        logging.info("✅ Loaded Quiz Data Successfully")
        return data
    except Exception as e:
        logging.error(f"🔥 Exception: {str(e)}")
        return {"error": "Failed to load quiz data"}
