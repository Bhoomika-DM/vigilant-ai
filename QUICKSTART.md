# Vigilant AI - Quick Start Guide

This guide will help you get Vigilant AI up and running in under 10 minutes.

## Prerequisites Check

Before starting, verify you have:

```bash
# Check Node.js (should be v18+)
node --version

# Check Python (should be v3.9+)
python --version

# Check MongoDB (should be v6+)
mongosh --version

# Check npm
npm --version

# Check pip
pip --version
```

If any are missing, install them from the links in README.md.

## Quick Setup (5 Steps)

### Step 1: Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend && npm install && cd ..

# Install backend dependencies
cd backend && npm install && cd ..

# Install ML service dependencies
cd ml-service
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ..
```

### Step 2: Configure Environment Variables

```bash
# Frontend
cp frontend/.env.example frontend/.env

# Backend
cp backend/.env.example backend/.env

# ML Service
cp ml-service/.env.example ml-service/.env
```

**Important**: Edit `backend/.env` and set:
- `MONGODB_URI` to your MongoDB connection string
- `JWT_SECRET` to a secure random string

### Step 3: Start MongoDB

```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Verify it's running
mongosh
```

### Step 4: Download ML Models

Place pre-trained models in `ml-service/models/`:
- `mobilenet_classifier.h5`
- `resnet_extractor.h5`
- `yolov5_detector.pt`
- `xgboost_severity.model`

(For development, you can skip this and implement mock models first)

### Step 5: Start All Services

Open 3 terminal windows:

**Terminal 1 - Frontend:**
```bash
cd frontend
npm run dev
```
→ Opens at http://localhost:3000

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```
→ Runs at http://localhost:5000

**Terminal 3 - ML Service:**
```bash
cd ml-service
source venv/bin/activate  # On Windows: venv\Scripts\activate
uvicorn src.main:app --reload --port 8000
```
→ Runs at http://localhost:8000

## Verify Installation

1. Open http://localhost:3000 - You should see the Vigilant AI homepage
2. Open http://localhost:5000/health - Should return `{"status": "ok"}`
3. Open http://localhost:8000/docs - Should show FastAPI documentation

## Default Login

- **Username**: admin
- **Password**: admin123

## Next Steps

1. Read the full README.md for detailed documentation
2. Check out the API documentation at http://localhost:8000/docs
3. Start implementing features following the tasks in `.kiro/specs/vigilant-ai/tasks.md`

## Troubleshooting

### MongoDB Connection Error
```bash
# Make sure MongoDB is running
mongosh

# If not, start it:
# Windows: net start MongoDB
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### Port Already in Use
```bash
# Change the port in the respective .env file
# Frontend: VITE_PORT in vite.config.ts
# Backend: PORT in .env
# ML Service: --port flag in uvicorn command
```

### Python Virtual Environment Issues
```bash
# Recreate the virtual environment
cd ml-service
rm -rf venv
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Development Workflow

1. Make changes to code
2. Tests run automatically (if configured)
3. Linting and formatting on save (if IDE configured)
4. Commit changes with clear messages
5. Push to repository

## Running Tests

```bash
# All tests
npm run test:all

# Individual services
npm run test:frontend
npm run test:backend
npm run test:ml
```

## Need Help?

- Check README.md for detailed documentation
- Review CONTRIBUTING.md for development guidelines
- Create an issue on GitHub
- Check the troubleshooting section in README.md

Happy coding! 🚀
