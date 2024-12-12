import re
from fastapi import FastAPI, HTTPException, Body, Depends, Request
from fastapi.responses import FileResponse, RedirectResponse
from fastapi.middleware.cors import CORSMiddleware  # Add this import
from pydantic import BaseModel
import json
import os
from pathlib import Path
# from routes.vms import router as vms_router
# from routes.reports import router as reports_router
# from routes.ai import router as ai_router
# from routes.storage import router as storage_router
# from routes.payloads import router as payloads_router
# from routes.notifications import router as notifications_router
from routes.payment import router as payment_router
from routes.auth import get_current_user, User
app = FastAPI()
import time

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://swiftor.io"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserInit(BaseModel):
    username: str
    email: str
    password: str

@app.post("/init")
async def init_user(user: UserInit = Body(...)):
    with open("database/db.json", "r") as f:
        db = json.load(f)

    # Check if user already exists
    if any(u["email"] == user.email for u in db["X"]):
        raise HTTPException(status_code=400, detail="User with this email already exists")

    # Check username validity
    username_regex = re.compile(r'^[a-zA-Z0-9._-]+$')
    if not username_regex.match(user.username) or any(u["username"] == user.username for u in db["X"]):
        # Username is not valid or already exists, generate a generic one
        generic_username = user.email.split('@')[0]
        # Ensure the generic username is unique
        counter = 1
        while any(u["username"] == generic_username for u in db["X"]):
            generic_username = f"{user.email.split('@')[0]}_{counter}"
            counter += 1
        user.username = generic_username

    # Create new user following the User model
    new_user = {
        "username": user.username,
        "email": user.email,
        "plan": "core",
        "roles": ["user"],
        "vms": [],
        "reports": [],
        "swiftai": 0,
        "notifications": {
            "unread": [
                {
                    "from": "system",
                    "message": "Welcome to Swiftor! We're glad to have you here. If you have any questions, feel free to ask in our Discord server.",
                    "time": int(time.time() * 1000),
                    "id": "0"
                },
            ],
            "read": []  
        },
        "secrets": {},
        "networking": {},
        "payloads": []
    }

    # Add the new user to the database
    db["X"].append(new_user)

    # Save the updated database
    with open("database/db.json", "w") as f:
        json.dump(db, f, indent=2)

    # Create user directories
    base_path = Path("database/users") / user.username
    (base_path / "storage").mkdir(parents=True, exist_ok=True)
    (base_path / "storage" / "profile").mkdir(parents=True, exist_ok=True)
    (base_path / "storage" / "vms").mkdir(parents=True, exist_ok=True)
    (base_path / "workspace").mkdir(parents=True, exist_ok=True)
    
    # Create workspace.yml file
    workspace_config = f"""version: '3.9'
services:
    {user.username}_workspace:
        command: '--workspace=/swiftor/workspace/ --accessAuthCode={user.password}'
        image: [REDACTED]
        container_name: {user.username}_workspace
        restart: always
        environment:
            - VIRTUAL_HOST={user.username}_workspace.swiftor.io
            - VIRTUAL_PORT=6806
        volumes:
            - '../storage/workspace:/swiftor/workspace'
"""
    
    workspace_path = base_path / "workspace" / "workspace.yml"
    workspace_path.write_text(workspace_config)

    return {"message": "User initialized successfully", "user": new_user}

@app.get("/")
async def root():
    return {"message": "Welcome to the FastAPI version of the Swiftor API"}

@app.get("/init")
async def get_user_info(current_user: User = Depends(get_current_user)):
    return {
        "username": current_user.username,
        "plan": current_user.plan,
        "roles": current_user.roles
    }

@app.get("/get-usage")
async def get_user_info(current_user: User = Depends(get_current_user)):
    return {
        "percent_credit_used": current_user.swiftai,
    }

@app.get("/notifications")
async def get_notifications(current_user: User = Depends(get_current_user)):
    return {
        "notifications": current_user.notifications
    }

# Include VM routes
# app.include_router(vms_router, prefix="/vms", tags=["vms"])
# app.include_router(reports_router, prefix="/reports", tags=["reports"])
# app.include_router(ai_router, prefix="/ai", tags=["ai"])
# app.include_router(storage_router, prefix="/storage", tags=["storage"])
# app.include_router(payloads_router, prefix="/payloads", tags=["payloads"])
# app.include_router(notifications_router, prefix="/notifications", tags=["notifications"])
app.include_router(payment_router, prefix="/payment", tags=["payment"])

@app.get("/@{username}")
async def get_user_profile(username: str, request: Request):
    # Check for the custom header
    if not request.headers.get("swiftor-app-only"):
        # If header is missing, return limited public data
        with open("database/db.json", "r") as f:
            db = json.load(f)
        
        user = next((u for u in db["X"] if u["username"] == username), None)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Return only public information
        return {
            "username": user["username"],
            "roles": user["roles"]
        }
    
    # If header exists, proceed with full data
    with open("database/db.json", "r") as f:
        db = json.load(f)
    
    user = next((u for u in db["X"] if u["username"] == username), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user_data = {
        "username": user["username"],
        "plan": user["plan"],
        "roles": user["roles"],
        "swiftai": user["swiftai"],
        "reports": user["reports"],
        "vms": user["vms"],
    }
    return user_data

@app.get("/@{username}/pfp")
async def get_user_profile_picture(username: str):
    with open("database/db.json", "r") as f:
        db = json.load(f)
    
    user = next((u for u in db["X"] if u["username"] == username), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    profile_picture_path = Path(f"database/users/{username}/storage/profile/profile-picture.png")
    
    if profile_picture_path.exists():
        return FileResponse(profile_picture_path)
    else:
        return RedirectResponse(f"https://ui-avatars.com/api/?name={username}&background=1e293b&color=fff&bold=true&size=100")

@app.get("/@{username}/banner")
async def get_user_banner(username: str):
    with open("database/db.json", "r") as f:
        db = json.load(f)
    
    user = next((u for u in db["X"] if u["username"] == username), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    banner_path = Path(f"database/users/{username}/storage/profile/banner.png")
    default_banner_path = Path("database/default-banner.svg")
    
    if banner_path.exists():
        return FileResponse(banner_path)
    else:
        return FileResponse(default_banner_path)

@app.get("/@{username}/{reportid}")
async def get_user_report(username: str, reportid: str):
    with open("database/db.json", "r") as f:
        db = json.load(f)
    
    user = next((u for u in db["X"] if u["username"] == username), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    report = next((r for r in user["reports"] if r["id"] == reportid), None)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    if report.get("protected", False):
        raise HTTPException(status_code=403, detail="Report is private")
    
    report_path = Path(f"database/users/{username}/storage/reports/{reportid}.swiftr")
    if report_path.exists():
        return FileResponse(report_path)
    else:
        raise HTTPException(status_code=404, detail="Report file not found")
    
@app.get("/@{username}/{reportid}/logo")
async def get_user_report_logo(username: str, reportid: str):
    with open("database/db.json", "r") as f:
        db = json.load(f)
    
    user = next((u for u in db["X"] if u["username"] == username), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    report = next((r for r in user["reports"] if r["id"] == reportid), None)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    logo_path = Path(f"database/users/{username}/storage/reports/{reportid}.png")
    if logo_path.exists():
        return FileResponse(logo_path)
    else:
        raise HTTPException(status_code=404, detail="Logo not found")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5001)