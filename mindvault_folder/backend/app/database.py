from motor.motor_asyncio import AsyncIOMotorClient
import os

# Load MongoDB connection string from environment variables
MONGO_URI = os.getenv("MONGO_URI")


client = AsyncIOMotorClient(MONGO_URI)
db = client["flashcardDB"]  # Database name
flashcards_collection = db["flashcards"]  # Collection name

auth_db = client["authDB"]
users_collection = auth_db["users"]
