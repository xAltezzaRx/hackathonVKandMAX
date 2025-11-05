from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from ..db.session import get_session, Base, engine
from ..models.user import User
from ..schemas.user import UserCreate, UserOut
from ..schemas.auth import Token
from ..core.security import hash_password, verify_password, create_access_token, create_refresh_token, decode_token
from .deps import get_current_user

router = APIRouter(prefix="/auth", tags=["auth"])

@router.on_event("startup")
async def on_startup():
    # auto-create tables for speed (replace with Alembic later)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@router.post("/register", response_model=Token, status_code=201)
async def register(payload: UserCreate, session: AsyncSession = Depends(get_session)):
    existing = (await session.execute(select(User).where(User.email == payload.email))).scalar_one_or_none()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = User(email=payload.email, full_name=(payload.full_name or ""), hashed_password=hash_password(payload.password))
    session.add(user)
    await session.commit()
    await session.refresh(user)
    return Token(access_token=create_access_token(str(user.id)), refresh_token=create_refresh_token(str(user.id)))

@router.post("/login", response_model=Token)
async def login(payload: UserCreate, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(User).where(User.email == payload.email))
    user = result.scalar_one_or_none()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password")
    return Token(access_token=create_access_token(str(user.id)), refresh_token=create_refresh_token(str(user.id)))

@router.post("/refresh", response_model=Token)
async def refresh(token: dict):
    refresh_token = token.get("refresh_token")
    data = decode_token(refresh_token or "")
    if not data or data.get("type") != "refresh":
        raise HTTPException(status_code=401, detail="Invalid refresh token")
    sub = data["sub"]
    return Token(access_token=create_access_token(sub), refresh_token=create_refresh_token(sub))

@router.get("/me", response_model=UserOut)
async def me(current: User = Depends(get_current_user)):
    return current
