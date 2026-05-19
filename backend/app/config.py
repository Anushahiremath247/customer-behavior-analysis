import os
from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    default_db = "sqlite:////tmp/analytics.db" if os.getenv("VERCEL") == "1" else os.getenv("DATABASE_URL", "sqlite:///./analytics.db")
    DATABASE_URL: str = default_db
    FRONTEND_URL: str = "http://localhost:5173"

    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings()
