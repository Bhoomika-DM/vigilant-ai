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

export interface FilterState {
  severity: SeverityLevel | 'all';
  status: ComplaintStatus | 'all';
  infrastructureType: InfrastructureType | 'all';
}

export interface AnalyticsData {
  severityDistribution: Record<SeverityLevel, number>;
  typeDistribution: Record<InfrastructureType, number>;
  statusDistribution: Record<ComplaintStatus, number>;
  trends: { date: string; count: number }[];
}
