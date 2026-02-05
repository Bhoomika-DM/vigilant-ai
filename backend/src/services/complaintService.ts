import { v4 as uuidv4 } from 'uuid';
import { Complaint } from '../models/index.js';
import { analyzeImage } from './mlService.js';
import type { ComplaintStatus } from '../types/index.js';

export const createComplaint = async (
  imagePath: string,
  location: string,
  description?: string
) => {
  const mlResults = await analyzeImage(imagePath);

  const complaint = new Complaint({
    complaintId: uuidv4(),
    imagePath,
    location,
    description: description || '',
    infrastructureType: mlResults.infrastructure_type,
    detectedDefects: mlResults.detected_defects,
    boundingBoxes: mlResults.bounding_boxes,
    severityLevel: mlResults.severity_level,
    confidenceScore: mlResults.confidence_score,
    status: 'Pending',
    timestamp: new Date(),
  });

  await complaint.save();
  return complaint;
};

export const getComplaintById = async (complaintId: string) => {
  return await Complaint.findOne({ complaintId });
};

export const getComplaints = async (filters: any, page: number = 1, limit: number = 10) => {
  const query: any = {};

  if (filters.severity && filters.severity !== 'all') {
    query.severityLevel = filters.severity;
  }
  if (filters.status && filters.status !== 'all') {
    query.status = filters.status;
  }
  if (filters.infrastructureType && filters.infrastructureType !== 'all') {
    query.infrastructureType = filters.infrastructureType;
  }

  const skip = (page - 1) * limit;
  const complaints = await Complaint.find(query)
    .sort({ timestamp: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Complaint.countDocuments(query);

  return { complaints, total, page, totalPages: Math.ceil(total / limit) };
};

export const updateComplaintStatus = async (complaintId: string, status: ComplaintStatus) => {
  const complaint = await Complaint.findOneAndUpdate(
    { complaintId },
    { status, updatedAt: new Date() },
    { new: true }
  );
  return complaint;
};
