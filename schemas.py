from pydantic import BaseModel, EmailStr, constr
from typing import List, Optional
from datetime import datetime


# ✅ Base user schema (shared fields)
class UserBase(BaseModel):
    full_name: str
    email: EmailStr

PasswordStr = constr(min_length=6)

# 🔐 For user registration
class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: PasswordStr


# 🧾 User response schema
class UserOut(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    accounts: List["AccountOut"] = []

    class Config:
        orm_mode = True


# 🧾 Base schema for account
class AccountBase(BaseModel):
    account_number: str
    address: str


# ➕ For creating an account
class AccountCreate(AccountBase):
    pass


# 📤 Response schema for account
class AccountOut(AccountBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True


# 🔑 For login
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    email: Optional[str] = None


# 🧪 Show minimal user info for authentication
class UserInDB(UserBase):
    id: int
    hashed_password: str
    is_active: bool

    class Config:
        orm_mode = True


# Fix forward reference (because AccountOut uses UserOut and vice versa)
UserOut.update_forward_refs()


# 📱 Login schema (added this)
class UserLogin(BaseModel):
    email: EmailStr
    password: PasswordStr


# 📢 Login response schema (already defined)
class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut
