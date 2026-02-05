import mongoose, { Schema, Document } from 'mongoose';

export interface ILog extends Document {
  timestamp: Date;
  level: 'info' | 'warning' | 'error';
  service: 'express' | 'ml-service';
  message: string;
  metadata: Record<string, any>;
}

const LogSchema = new Schema({
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
    index: true,
  },
  level: {
    type: String,
    required: true,
    enum: ['info', 'warning', 'error'],
  },
  service: {
    type: String,
    required: true,
    enum: ['express', 'ml-service'],
  },
  message: {
    type: String,
    required: true,
  },
  metadata: {
    type: Schema.Types.Mixed,
    default: {},
  },
});

export const Log = mongoose.model<ILog>('Log', LogSchema);
