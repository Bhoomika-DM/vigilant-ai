import mongoose, { Schema, Document } from 'mongoose';
import type { InfrastructureType, Defect, SeverityLevel, ComplaintStatus, BoundingBox } from '../types/index.js';

export interface IComplaint extends Document {
  complaintId: string;
  imagePath: string;
  location: string;
  description?: string;
  infrastructureType: InfrastructureType;
  detectedDefects: Defect[];
  boundingBoxes: BoundingBox[];
  severityLevel: SeverityLevel;
  confidenceScore: number;
  status: ComplaintStatus;
  timestamp: Date;
  updatedAt: Date;
}

const BoundingBoxSchema = new Schema({
  x1: { type: Number, required: true },
  y1: { type: Number, required: true },
  x2: { type: Number, required: true },
  y2: { type: Number, required: true },
  confidence: { type: Number, required: true, min: 0, max: 1 },
  class: { type: String, required: true },
}, { _id: false });

const ComplaintSchema = new Schema({
  complaintId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  infrastructureType: {
    type: String,
    required: true,
    enum: ['road', 'bridge', 'drainage', 'electrical', 'building', 'other'],
  },
  detectedDefects: [{
    type: String,
    enum: ['crack', 'corrosion', 'blockage', 'damage', 'wear'],
  }],
  boundingBoxes: [BoundingBoxSchema],
  severityLevel: {
    type: String,
    required: true,
    enum: ['Low', 'Medium', 'High'],
    index: true,
  },
  confidenceScore: {
    type: Number,
    required: true,
    min: 0,
    max: 1,
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'In Progress', 'Resolved'],
    default: 'Pending',
    index: true,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
    index: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
ComplaintSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Complaint = mongoose.model<IComplaint>('Complaint', ComplaintSchema);
