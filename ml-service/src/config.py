"""
Configuration management for ML Microservice.
Loads settings from environment variables using pydantic-settings.
"""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Application settings loaded from environment variables.
    """
    
    # Server Configuration
    PORT: int = 8000
    HOST: str = "0.0.0.0"
    DEBUG: bool = True
    
    # Model Paths
    MOBILENET_MODEL_PATH: str = "models/mobilenet_classifier.h5"
    RESNET_MODEL_PATH: str = "models/resnet_extractor.h5"
    YOLO_MODEL_PATH: str = "models/yolov5_detector.pt"
    XGBOOST_MODEL_PATH: str = "models/xgboost_severity.model"
    
    # Model Configuration
    YOLO_CONFIDENCE_THRESHOLD: float = 0.5
    DEFECT_SIMILARITY_THRESHOLD: float = 0.7
    
    # Processing Configuration
    MAX_IMAGE_SIZE_MB: int = 10
    IMAGE_PROCESSING_TIMEOUT: int = 30
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True
    )


# Create global settings instance
settings = Settings()
