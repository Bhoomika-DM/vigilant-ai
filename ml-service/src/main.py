"""
Vigilant AI - ML Microservice
FastAPI application for infrastructure image analysis using multiple AI models.
"""

import logging
from contextlib import asynccontextmanager
from datetime import datetime

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .config import settings
from .logging_config import setup_logging


# Set up logging
setup_logging()
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager for startup and shutdown events.
    """
    # Startup
    logger.info("Starting ML Microservice...")
    logger.info(f"Environment: {'Development' if settings.DEBUG else 'Production'}")
    logger.info(f"Server: {settings.HOST}:{settings.PORT}")
    
    # TODO: Load ML models here in future tasks
    # - MobileNet classifier
    # - ResNet feature extractor
    # - YOLO detector
    # - XGBoost predictor
    
    logger.info("ML Microservice started successfully")
    
    yield
    
    # Shutdown
    logger.info("Shutting down ML Microservice...")
    # TODO: Cleanup resources if needed


# Create FastAPI application
app = FastAPI(
    title="Vigilant AI - ML Microservice",
    description="AI-powered infrastructure monitoring and defect detection service",
    version="1.0.0",
    lifespan=lifespan
)


# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """
    Global exception handler for unhandled errors.
    Logs the error and returns a consistent error response.
    """
    logger.error(
        f"Unhandled exception: {str(exc)}",
        exc_info=True,
        extra={
            "url": str(request.url),
            "method": request.method,
            "client": request.client.host if request.client else None
        }
    )
    
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "message": "ML service error",
            "details": str(exc) if settings.DEBUG else "An error occurred during image analysis",
            "timestamp": datetime.utcnow().isoformat()
        }
    )


# Validation exception handler
@app.exception_handler(ValueError)
async def validation_exception_handler(request: Request, exc: ValueError):
    """
    Handler for validation errors (invalid input).
    """
    logger.warning(
        f"Validation error: {str(exc)}",
        extra={
            "url": str(request.url),
            "method": request.method
        }
    )
    
    return JSONResponse(
        status_code=400,
        content={
            "success": False,
            "message": "Invalid input",
            "details": str(exc),
            "timestamp": datetime.utcnow().isoformat()
        }
    )


# Health check endpoint
@app.get("/health", tags=["Health"])
async def health_check():
    """
    Health check endpoint to verify service is running.
    
    Returns:
        dict: Service status and timestamp
    """
    return {
        "status": "healthy",
        "service": "ml-microservice",
        "timestamp": datetime.utcnow().isoformat(),
        "version": "1.0.0"
    }


# Root endpoint
@app.get("/", tags=["Root"])
async def root():
    """
    Root endpoint with service information.
    
    Returns:
        dict: Service information
    """
    return {
        "service": "Vigilant AI - ML Microservice",
        "description": "AI-powered infrastructure monitoring and defect detection",
        "version": "1.0.0",
        "endpoints": {
            "health": "/health",
            "docs": "/docs",
            "predict": "/predict (coming soon)"
        }
    }


# TODO: Add /predict endpoint in task 2.10
# This will orchestrate all ML models for image analysis
