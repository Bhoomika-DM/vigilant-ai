import { Request, Response } from 'express';
import * as complaintService from '../services/complaintService.js';
import type { AuthRequest } from '../middleware/auth.js';

export const createComplaint = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image file is required',
      });
    }

    const { location, description } = req.body;

    if (!location) {
      return res.status(400).json({
        success: false,
        message: 'Location is required',
      });
    }

    const complaint = await complaintService.createComplaint(
      req.file.path,
      location,
      description
    );

    res.status(201).json({
      success: true,
      complaintId: complaint.complaintId,
      message: 'Complaint submitted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create complaint',
    });
  }
};

export const getComplaintById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const complaint = await complaintService.getComplaintById(id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found',
      });
    }

    res.json({
      success: true,
      complaint,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve complaint',
    });
  }
};

export const getComplaints = async (req: AuthRequest, res: Response) => {
  try {
    const { severity, status, infrastructureType, page = '1', limit = '10' } = req.query;

    const result = await complaintService.getComplaints(
      { severity, status, infrastructureType },
      parseInt(page as string),
      parseInt(limit as string)
    );

    res.json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve complaints',
    });
  }
};

export const updateStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Pending', 'In Progress', 'Resolved'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value',
      });
    }

    const complaint = await complaintService.updateComplaintStatus(id, status);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found',
      });
    }

    res.json({
      success: true,
      complaint,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update complaint status',
    });
  }
};
