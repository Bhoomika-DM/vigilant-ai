import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/vigilant-ai',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
  mlServiceUrl: process.env.ML_SERVICE_URL || 'http://localhost:8000',
  uploadDir: process.env.UPLOAD_DIR || 'uploads',
  maxFileSizeMB: parseInt(process.env.MAX_FILE_SIZE_MB || '10', 10),
};
