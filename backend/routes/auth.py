from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
import jwt
import json
import os
from dotenv import load_dotenv

# Load environment variables from .env.local
load_dotenv(".env.local")

# JWT settings from environment variables
JWT_SECRET = os.getenv("JWT_SECRET")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM")

security = HTTPBearer()

class User(BaseModel):
    username: str
    email: str
    plan: str
    roles: list
    vms: list
    reports: list
    swiftai: int
    notifications: dict
    secrets: dict
    networking: dict
    payloads: list

def verify_jwt(token: str) -> dict:
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM], options={"verify_aud": False})
        return payload
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    payload = verify_jwt(token)
    email = payload.get("email")

    # Load database
    with open("database/db.json", "r") as f:
        db = json.load(f)

    user = next((user for user in db["X"] if user["email"] == email), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return User(**user)