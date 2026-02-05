# Vigilant AI - Smart Infrastructure Monitoring & Complaint Prioritization System
##Deployed Link: https://sampoornasuraksha.netlify.app/
Vigilant AI is a full-stack web application that enables citizens to submit infrastructure complaints with images. The system uses AI models to automatically detect, classify, and prioritize civic infrastructure issues, providing authorities with an intelligent dashboard for complaint management and resolution tracking.

## 🏗️ Architecture

The system follows a microservices architecture with three main components:

- **Frontend**: React.js + TypeScript (Vite)
- **Backend**: Node.js + Express.js + TypeScript
- **ML Service**: Python + FastAPI

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer                             │
│  ┌──────────────────────┐    ┌──────────────────────┐      │
│  │  Citizen Interface   │    │  Admin Dashboard     │      │
│  │     (React.js)       │    │     (React.js)       │      │
│  └──────────┬───────────┘    └──────────┬───────────┘      │
└─────────────┼──────────────────────────┼──────────────────┘
              │      HTTP/REST API        │
┌─────────────┴───────────────────────────┴──────────────────┐
│         Express.js Backend (Node.js + TypeScript)           │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │ Complaint  │  │    Auth    │  │   Image    │           │
│  │   Routes   │  │ Middleware │  │  Handler   │           │
│  └────────────┘  └────────────┘  └────────────┘           │
└─────────────┬───────────────────────────┬──────────────────┘
              │                           │
┌─────────────┴──────────────┐  ┌─────────┴─────────────────┐
│      MongoDB Database      │  │   ML Microservice         │
│  ┌───────────────┐         │  │  ┌─────────────────────┐ │
│  │  Complaints   │         │  │  │  FastAPI Service    │ │
│  │  Users        │         │  │  │  ┌───────────────┐  │ │
│  │  Predictions  │         │  │  │  │  MobileNet    │  │ │
│  │  Logs         │         │  │  │  │  ResNet-50    │  │ │
│  └───────────────┘         │  │  │  │  YOLOv5       │  │ │
└────────────────────────────┘  │  │  │  XGBoost      │  │ │
                                │  │  └───────────────┘  │ │
                                │  └─────────────────────┘ │
                                └───────────────────────────┘
```

## 🚀 Features

### Citizen Features
- Submit infrastructure complaints with image uploads
- Track complaint status using unique complaint ID
- View complaint details and AI analysis results

### Admin Features
- Secure authentication with JWT tokens
- View and manage all complaints
- Filter complaints by severity, status, and infrastructure type
- Update complaint status (Pending → In Progress → Resolved)
- Visual analytics dashboard with charts and trends

### AI-Powered Analysis
- **MobileNet**: Infrastructure type classification (road, bridge, drainage, etc.)
- **ResNet-50**: Feature extraction and defect detection (cracks, corrosion, blockage)
- **YOLOv5**: Real-time object detection with bounding boxes
- **XGBoost**: Severity prediction (Low, Medium, High)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.9 or higher) - [Download](https://www.python.org/)
- **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd vigilant-ai
```

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env

# Edit .env and configure:
# - MONGODB_URI (your MongoDB connection string)
# - JWT_SECRET (generate a secure random string)
# - ML_SERVICE_URL (default: http://localhost:8000)

# Build TypeScript
npm run build

# Start development server
npm run dev
```

The backend API will be available at `http://localhost:5000`

### 4. ML Service Setup

```bash
cd ml-service

# Create Python virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment configuration
cp .env.example .env

# Download pre-trained models (see Models section below)

# Start development server
uvicorn src.main:app --reload --port 8000
```

The ML service will be available at `http://localhost:8000`

### 5. MongoDB Setup

```bash
# Start MongoDB service
# On Windows (if installed as service):
net start MongoDB

# On macOS (using Homebrew):
brew services start mongodb-community

# On Linux:
sudo systemctl start mongod

# Verify MongoDB is running
mongosh
```

## 📦 ML Models

The ML service requires pre-trained models. You have two options:

### Option 1: Download Pre-trained Models (Recommended)

Download the models from the project's model repository and place them in `ml-service/models/`:

```
ml-service/models/
├── mobilenet_classifier.h5
├── resnet_extractor.h5
├── yolov5_detector.pt
└── xgboost_severity.model
```

### Option 2: Train Your Own Models

Follow the training instructions in `ml-service/docs/model-training.md`

## 🧪 Running Tests

### Frontend Tests

```bash
cd frontend
npm test                 # Run all tests
npm run test:watch      # Run tests in watch mode
```

### Backend Tests

```bash
cd backend
npm test                 # Run all tests
npm run test:watch      # Run tests in watch mode
```

### ML Service Tests

```bash
cd ml-service
source venv/bin/activate  # Activate virtual environment
pytest                    # Run all tests
pytest -v                 # Run with verbose output
pytest -m property        # Run only property-based tests
```

## 🔧 Development Workflow

### Starting All Services

You'll need three terminal windows:

**Terminal 1 - Frontend:**
```bash
cd frontend
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 3 - ML Service:**
```bash
cd ml-service
source venv/bin/activate  # or venv\Scripts\activate on Windows
uvicorn src.main:app --reload --port 8000
```

### Code Quality

**Linting:**
```bash
# Frontend
cd frontend && npm run lint

# Backend
cd backend && npm run lint
```

**Formatting:**
```bash
# Frontend
cd frontend && npm run format

# Backend
cd backend && npm run format
```

## 📚 API Documentation

Once the backend is running, API documentation is available at:

- Swagger UI: `http://localhost:5000/api-docs`
- ML Service Docs: `http://localhost:8000/docs`

## 🔐 Default Admin Credentials

For initial setup, use these credentials to log in to the admin dashboard:

- **Username**: `admin`
- **Password**: `admin123`

⚠️ **Important**: Change these credentials in production!

## 📁 Project Structure

```
vigilant-ai/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API client services
│   │   ├── types/           # TypeScript interfaces
│   │   └── utils/           # Utility functions
│   ├── public/              # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/                  # Express backend API
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Express middleware
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Utility functions
│   │   └── server.ts        # Entry point
│   ├── uploads/             # Uploaded images
│   ├── package.json
│   └── tsconfig.json
│
├── ml-service/               # Python ML microservice
│   ├── src/
│   │   ├── models/          # ML model classes
│   │   ├── services/        # ML inference services
│   │   ├── utils/           # Utility functions
│   │   └── main.py          # FastAPI entry point
│   ├── models/              # Pre-trained model files
│   ├── tests/               # Test files
│   ├── requirements.txt
│   └── pytest.ini
│
├── .gitignore
├── .prettierrc.json
└── README.md
```

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Error**: `MongoServerError: connect ECONNREFUSED`

**Solution**: Ensure MongoDB is running:
```bash
# Check MongoDB status
mongosh

# If not running, start it:
# Windows: net start MongoDB
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### ML Service Import Errors

**Error**: `ModuleNotFoundError: No module named 'torch'`

**Solution**: Ensure virtual environment is activated and dependencies are installed:
```bash
cd ml-service
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

### Port Already in Use

**Error**: `EADDRINUSE: address already in use :::3000`

**Solution**: Kill the process using the port or change the port in configuration:
```bash
# Find process using port 3000
# Windows: netstat -ano | findstr :3000
# macOS/Linux: lsof -i :3000

# Kill the process
# Windows: taskkill /PID <PID> /F
# macOS/Linux: kill -9 <PID>
```

### Image Upload Fails

**Error**: `413 Payload Too Large`

**Solution**: Check that image is under 10MB. If you need to increase the limit, update:
- Backend: `MAX_FILE_SIZE_MB` in `.env`
- Frontend: `VITE_MAX_IMAGE_SIZE_MB` in `.env`

## 🚢 Production Deployment

### Environment Variables

Ensure all environment variables are properly configured for production:

**Backend (.env):**
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=<your-production-mongodb-uri>
JWT_SECRET=<strong-random-secret>
ML_SERVICE_URL=<your-ml-service-url>
```

**Frontend (.env):**
```env
VITE_API_BASE_URL=<your-backend-api-url>
```

### Build for Production

**Frontend:**
```bash
cd frontend
npm run build
# Output will be in frontend/dist/
```

**Backend:**
```bash
cd backend
npm run build
# Output will be in backend/dist/
```

### Docker Deployment (Optional)

Docker configuration files can be added for containerized deployment. See `docs/docker-deployment.md` for details.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation in the `docs/` folder

## 🙏 Acknowledgments

- MobileNet, ResNet-50, YOLOv5, and XGBoost model architectures
- React, Express, FastAPI, and MongoDB communities
- All contributors to this project
