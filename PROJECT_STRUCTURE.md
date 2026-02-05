# Vigilant AI - Project Structure

This document provides an overview of the complete project structure.

## Directory Tree

```
vigilant-ai/
│
├── .kiro/                          # Kiro specification files
│   └── specs/
│       └── vigilant-ai/
│           ├── requirements.md     # System requirements
│           ├── design.md           # Architecture and design
│           └── tasks.md            # Implementation tasks
│
├── frontend/                       # React Frontend Application
│   ├── src/                        # Source code
│   │   └── .gitkeep
│   ├── public/                     # Static assets
│   │   └── .gitkeep
│   ├── .env.example                # Environment variables template
│   ├── .eslintrc.json              # ESLint configuration
│   ├── .prettierrc.json            # Prettier configuration
│   ├── package.json                # Dependencies and scripts
│   ├── tsconfig.json               # TypeScript configuration
│   ├── tsconfig.node.json          # TypeScript config for Vite
│   └── vite.config.ts              # Vite build configuration
│
├── backend/                        # Express Backend API
│   ├── src/                        # Source code
│   │   └── .gitkeep
│   ├── uploads/                    # Uploaded images storage
│   │   └── .gitkeep
│   ├── .env.example                # Environment variables template
│   ├── .eslintrc.json              # ESLint configuration
│   ├── .prettierrc.json            # Prettier configuration
│   ├── jest.config.js              # Jest testing configuration
│   ├── package.json                # Dependencies and scripts
│   └── tsconfig.json               # TypeScript configuration
│
├── ml-service/                     # Python ML Microservice
│   ├── src/                        # Source code
│   │   └── .gitkeep
│   ├── models/                     # Pre-trained ML models
│   │   └── .gitkeep
│   ├── tests/                      # Test files
│   │   └── .gitkeep
│   ├── .env.example                # Environment variables template
│   ├── .python-version             # Python version specification
│   ├── pytest.ini                  # Pytest configuration
│   ├── requirements.txt            # Python dependencies
│   └── setup.py                    # Package setup configuration
│
├── .editorconfig                   # Editor configuration
├── .eslintignore                   # ESLint ignore patterns
├── .gitignore                      # Git ignore patterns
├── .prettierrc.json                # Root Prettier configuration
├── CONTRIBUTING.md                 # Contribution guidelines
├── LICENSE                         # MIT License
├── package.json                    # Root package.json (monorepo)
├── PROJECT_STRUCTURE.md            # This file
├── QUICKSTART.md                   # Quick start guide
└── README.md                       # Main documentation
```

## Configuration Files Summary

### Root Level
- **package.json**: Monorepo configuration with workspace scripts
- **.gitignore**: Excludes node_modules, build outputs, env files, uploads
- **.prettierrc.json**: Code formatting rules (2 spaces, single quotes)
- **.editorconfig**: Editor settings for consistent coding style
- **.eslintignore**: Files to exclude from linting

### Frontend (React + TypeScript + Vite)
- **package.json**: React 18, TypeScript, Vite, Chart.js, Axios, React Router
- **tsconfig.json**: Strict TypeScript with ES2020 target
- **vite.config.ts**: Dev server on port 3000, proxy to backend
- **.eslintrc.json**: React + TypeScript linting rules
- **.env.example**: API base URL, app settings

### Backend (Node.js + Express + TypeScript)
- **package.json**: Express, Mongoose, JWT, Multer, Axios
- **tsconfig.json**: Strict TypeScript with ES2020 target
- **jest.config.js**: Jest with ts-jest, 80% coverage threshold
- **.eslintrc.json**: Node.js + TypeScript linting rules
- **.env.example**: MongoDB URI, JWT secret, ML service URL, ports

### ML Service (Python + FastAPI)
- **requirements.txt**: FastAPI, PyTorch, TensorFlow, XGBoost, OpenCV
- **setup.py**: Package configuration with dependencies
- **pytest.ini**: Pytest configuration with markers
- **.python-version**: Python 3.11
- **.env.example**: Model paths, processing configuration

## Key Features of the Setup

### TypeScript Configuration
- Strict mode enabled for type safety
- ES2020 target for modern JavaScript features
- Source maps for debugging
- Declaration files for library usage

### Testing Setup
- **Frontend**: Jest + React Testing Library + fast-check
- **Backend**: Jest + Supertest + fast-check
- **ML Service**: Pytest + Hypothesis
- Coverage threshold: 80% for all services

### Code Quality
- ESLint for linting (TypeScript rules)
- Prettier for formatting (consistent style)
- EditorConfig for editor consistency
- Pre-configured scripts for lint and format

### Development Experience
- Hot reload for all services (Vite, tsx watch, uvicorn --reload)
- TypeScript for type safety in frontend and backend
- Comprehensive npm scripts for common tasks
- Monorepo structure with workspace support

### Environment Configuration
- Separate .env files for each service
- .env.example templates with all required variables
- Clear documentation of each variable

### Documentation
- **README.md**: Comprehensive setup and usage guide
- **QUICKSTART.md**: Fast setup for developers
- **CONTRIBUTING.md**: Contribution guidelines
- **PROJECT_STRUCTURE.md**: This file
- **LICENSE**: MIT License

## Next Steps

1. Install dependencies: `npm run install:all`
2. Configure environment variables (copy .env.example files)
3. Start MongoDB
4. Download or train ML models
5. Start all services: See QUICKSTART.md
6. Begin implementation following tasks.md

## Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Charts**: Chart.js + react-chartjs-2
- **Testing**: Jest + React Testing Library + fast-check

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js with TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **File Upload**: Multer
- **Testing**: Jest + Supertest + fast-check

### ML Service
- **Framework**: FastAPI
- **ML Libraries**: PyTorch, TensorFlow, XGBoost
- **Image Processing**: OpenCV, Pillow
- **Testing**: Pytest + Hypothesis

### Database
- **Primary**: MongoDB 6+
- **ODM**: Mongoose (for Node.js)

## Port Configuration

- **Frontend**: 3000 (Vite dev server)
- **Backend**: 5000 (Express API)
- **ML Service**: 8000 (FastAPI)
- **MongoDB**: 27017 (default)

## Environment Variables

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:5000
VITE_APP_NAME=Vigilant AI
VITE_MAX_IMAGE_SIZE_MB=10
```

### Backend (.env)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/vigilant-ai
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h
ML_SERVICE_URL=http://localhost:8000
UPLOAD_DIR=uploads
MAX_FILE_SIZE_MB=10
```

### ML Service (.env)
```
PORT=8000
HOST=0.0.0.0
DEBUG=True
MOBILENET_MODEL_PATH=models/mobilenet_classifier.h5
RESNET_MODEL_PATH=models/resnet_extractor.h5
YOLO_MODEL_PATH=models/yolov5_detector.pt
XGBOOST_MODEL_PATH=models/xgboost_severity.model
```

## Scripts Reference

### Root Level
```bash
npm run install:all      # Install all dependencies
npm run dev:frontend     # Start frontend dev server
npm run dev:backend      # Start backend dev server
npm run dev:ml           # Start ML service
npm run build:frontend   # Build frontend for production
npm run build:backend    # Build backend for production
npm run test:all         # Run all tests
npm run lint:all         # Lint all code
npm run format:all       # Format all code
```

### Frontend
```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint
npm run format           # Run Prettier
npm test                 # Run tests
```

### Backend
```bash
npm run dev              # Start dev server with watch
npm run build            # Build TypeScript
npm start                # Start production server
npm run lint             # Run ESLint
npm run format           # Run Prettier
npm test                 # Run tests
```

### ML Service
```bash
uvicorn src.main:app --reload --port 8000  # Start dev server
pytest                                      # Run all tests
pytest -v                                   # Verbose output
pytest -m property                          # Run property tests only
```

## File Naming Conventions

- **TypeScript/JavaScript**: camelCase for files, PascalCase for components
- **Python**: snake_case for files and functions
- **Tests**: `*.test.ts` (TS/JS), `test_*.py` (Python)
- **Config**: lowercase with dots (e.g., `.eslintrc.json`)

## Import/Export Patterns

### Frontend/Backend (ES Modules)
```typescript
import { something } from './module';
export const something = ...;
export default Component;
```

### ML Service (Python)
```python
from module import something
from .local_module import something_else
```

## Validation Requirements Met

This project setup satisfies all requirements from Task 1:

✅ Created project directory structure for monorepo (frontend, backend, ml-service)
✅ Initialized package.json for frontend and backend with TypeScript configuration
✅ Initialized Python virtual environment setup and requirements.txt for ML service
✅ Set up environment configuration files (.env.example) for all services
✅ Configured TypeScript (tsconfig.json) for frontend and backend
✅ Set up ESLint and Prettier for code quality
✅ Created README.md with setup instructions
✅ Requirements: 13.1, 13.2, 13.3, 13.5

## Additional Files Created

Beyond the minimum requirements, the following helpful files were also created:

- **QUICKSTART.md**: Fast setup guide for developers
- **CONTRIBUTING.md**: Contribution guidelines
- **LICENSE**: MIT License
- **.editorconfig**: Editor configuration
- **.eslintignore**: ESLint ignore patterns
- **PROJECT_STRUCTURE.md**: This comprehensive overview
- **Root package.json**: Monorepo scripts for convenience

All configuration files follow best practices and industry standards for their respective technologies.
