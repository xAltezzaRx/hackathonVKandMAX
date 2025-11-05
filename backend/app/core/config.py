from pydantic import BaseModel
import os

class Settings(BaseModel):
    env: str = os.getenv("ENV", "local")
    database_url: str = os.getenv("DATABASE_URL", "postgresql+asyncpg://app:app@db:5432/app")
    jwt_secret: str = os.getenv("JWT_SECRET", "change_me")
    jwt_algorithm: str = "HS256"
    access_token_minutes: int = int(os.getenv("ACCESS_TOKEN_MINUTES", "30"))
    refresh_token_days: int = int(os.getenv("REFRESH_TOKEN_DAYS", "7"))
    cors_origins: list[str] = [o for o in os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",") if o]

settings = Settings()
