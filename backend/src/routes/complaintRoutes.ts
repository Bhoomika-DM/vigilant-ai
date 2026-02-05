import { Router } from 'express';
import * as complaintController from '../controllers/complaintController.js';
import { verifyToken } from '../middleware/auth.js';
import { upload } from '../services/imageStorage.js';

const router = Router();

router.post('/', upload.single('image'), complaintController.createComplaint);
router.get('/:id', complaintController.getComplaintById);
router.get('/', verifyToken, complaintController.getComplaints);
router.put('/:id/status', verifyToken, complaintController.updateStatus);

export default router;
