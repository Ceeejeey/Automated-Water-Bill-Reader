from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from models import User
from schemas import UserCreate, UserOut
from database import SessionLocal
from auth import hash_password

register = APIRouter()


# 📦 Get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 🔐 Register endpoint
@register.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    # 🔍 Check for existing email
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # 🔐 Hash the password
    hashed_pw = hash_password(user.password)

    # 🆕 Create user object
    new_user = User(
        full_name=user.full_name,
        email=user.email,
        hashed_password=hashed_pw,
    )

    # 💾 Save to DB
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user
