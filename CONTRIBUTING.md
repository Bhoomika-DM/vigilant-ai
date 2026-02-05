# Contributing to Vigilant AI

Thank you for your interest in contributing to Vigilant AI! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Run tests to ensure everything works
6. Commit your changes with clear commit messages
7. Push to your fork: `git push origin feature/your-feature-name`
8. Create a Pull Request

## Development Guidelines

### Code Style

- **TypeScript/JavaScript**: Follow the ESLint and Prettier configurations
- **Python**: Follow PEP 8 style guidelines
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Testing

- Write unit tests for all new functionality
- Write property-based tests for core logic
- Ensure all tests pass before submitting PR
- Aim for at least 80% code coverage

### Commit Messages

Use clear and descriptive commit messages:

```
feat: Add complaint filtering by infrastructure type
fix: Resolve image upload validation bug
docs: Update API documentation
test: Add property tests for ML service
refactor: Simplify authentication middleware
```

### Pull Request Process

1. Update the README.md with details of changes if applicable
2. Update documentation for any API changes
3. Ensure all tests pass
4. Request review from maintainers
5. Address any feedback from code review

## Project Structure

- `frontend/` - React frontend application
- `backend/` - Express backend API
- `ml-service/` - Python ML microservice
- `docs/` - Additional documentation

## Running Tests

```bash
# Frontend tests
cd frontend && npm test

# Backend tests
cd backend && npm test

# ML service tests
cd ml-service && pytest
```

## Questions?

If you have questions, please:
- Check existing issues and discussions
- Create a new issue with the "question" label
- Reach out to the maintainers

Thank you for contributing! 🎉
