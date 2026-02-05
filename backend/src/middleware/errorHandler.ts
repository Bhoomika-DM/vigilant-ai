import { Request, Response, NextFunction } from 'express';
import { Log } from '../models/index.js';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);

  Log.create({
    level: 'error',
    service: 'express',
    message: err.message || 'Internal server error',
    metadata: {
      stack: err.stack,
      path: req.path,
      method: req.method,
    },
  }).catch(console.error);

  const status = err.status || 500;
  const message = err.message || 'Internal server error';

  res.status(status).json({
    success: false,
    message,
    timestamp: new Date().toISOString(),
  });
};
