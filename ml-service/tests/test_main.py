"""
Unit tests for main FastAPI application.
Tests health check endpoint and basic application setup.
"""

import pytest
from fastapi.testclient import TestClient

from src.main import app


# Create test client with proper initialization
@pytest.fixture
def client():
    """Create a test client for the FastAPI app."""
    with TestClient(app=app) as test_client:
        yield test_client


def test_health_check(client):
    """
    Test health check endpoint returns correct status.
    Validates: Requirement 8.1 - ML microservice exposes health check
    """
    response = client.get("/health")
    
    assert response.status_code == 200
    data = response.json()
    
    assert data["status"] == "healthy"
    assert data["service"] == "ml-microservice"
    assert "timestamp" in data
    assert data["version"] == "1.0.0"


def test_root_endpoint(client):
    """
    Test root endpoint returns service information.
    """
    response = client.get("/")
    
    assert response.status_code == 200
    data = response.json()
    
    assert data["service"] == "Vigilant AI - ML Microservice"
    assert "version" in data
    assert "endpoints" in data
    assert "health" in data["endpoints"]
    assert "docs" in data["endpoints"]


def test_cors_headers(client):
    """
    Test CORS middleware is configured correctly.
    """
    response = client.options(
        "/health",
        headers={
            "Origin": "http://localhost:3000",
            "Access-Control-Request-Method": "GET"
        }
    )
    
    # CORS headers should be present
    assert "access-control-allow-origin" in response.headers


def test_invalid_endpoint_returns_404(client):
    """
    Test that invalid endpoints return 404.
    """
    response = client.get("/invalid-endpoint")
    
    assert response.status_code == 404


def test_error_response_format(client):
    """
    Test that error responses have consistent format.
    This will be more relevant when we add endpoints that can fail.
    """
    # For now, just verify 404 has proper JSON format
    response = client.get("/nonexistent")
    
    assert response.status_code == 404
    data = response.json()
    
    # FastAPI default 404 format
    assert "detail" in data

