from fastapi import FastAPI, File, UploadFile, Depends
from fastapi.responses import JSONResponse
from register import register 
from login import login
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import cv2
from ultralytics import YOLO
from sqlalchemy.orm import Session
from database import SessionLocal# Assuming you have this as a dependency
from models import User
from auth import get_user_from_token, oauth2_scheme  # Your JWT-based authentication dependency
from fastapi.security import OAuth2PasswordBearer



app = FastAPI()

        
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins, you can specify domains like ["https://example.com"]
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)



@app.get("/")
async def read_root():
    return {"Hello": "World"}


app.include_router(register, prefix="/api")
app.include_router(login, prefix="/api" )

