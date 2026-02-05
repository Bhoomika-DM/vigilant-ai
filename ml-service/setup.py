from setuptools import setup, find_packages

setup(
    name="vigilant-ai-ml-service",
    version="1.0.0",
    description="Vigilant AI - ML Microservice for Infrastructure Analysis",
    author="Vigilant AI Team",
    packages=find_packages(where="src"),
    package_dir={"": "src"},
    python_requires=">=3.9",
    install_requires=[
        "fastapi>=0.108.0",
        "uvicorn[standard]>=0.25.0",
        "python-multipart>=0.0.6",
        "torch>=2.1.2",
        "torchvision>=0.16.2",
        "tensorflow>=2.15.0",
        "xgboost>=2.0.3",
        "numpy>=1.26.2",
        "pillow>=10.1.0",
        "opencv-python>=4.8.1.78",
        "python-dotenv>=1.0.0",
        "pydantic>=2.5.3",
        "pydantic-settings>=2.1.0",
    ],
    extras_require={
        "dev": [
            "pytest>=7.4.3",
            "pytest-asyncio>=0.23.2",
            "hypothesis>=6.92.2",
            "httpx>=0.25.2",
        ]
    },
)
