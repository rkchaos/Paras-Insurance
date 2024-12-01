import express from 'express';
import { assignPolicy } from '../controllers/assignedPolicy.controller.js';

const router = express.Router();

router.post('/assign', assignPolicy);

export default router;