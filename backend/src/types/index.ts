export type InfrastructureType = 'road' | 'bridge' | 'drainage' | 'electrical' | 'building' | 'other';
export type Defect = 'crack' | 'corrosion' | 'blockage' | 'damage' | 'wear';
export type SeverityLevel = 'Low' | 'Medium' | 'High';
export type ComplaintStatus = 'Pending' | 'In Progress' | 'Resolved';

export interface BoundingBox {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  confidence: number;
  class: string;
}

export interface Complaint {
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
  updatedAt?: Date;
}

export interface User {
  username: string;
  passwordHash: string;
  role: 'admin';
  createdAt: Date;
}

export interface MLAnalysisResult {
  infrastructure_type: InfrastructureType;
  confidence_score: number;
  detected_defects: Defect[];
  bounding_boxes: BoundingBox[];
  severity_level: SeverityLevel;
}
