"""
Startup script for ML Microservice.
Runs the FastAPI application using uvicorn.
"""

import uvicorn
from src.config import settings


if __name__ == "__main__":
    uvicorn.run(
        "src.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
        log_level="info"
    )
