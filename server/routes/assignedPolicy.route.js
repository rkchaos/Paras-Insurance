import express from 'express';
import { addAssignPolicy, assignPolicy, fecthAllUnassignedPolicies } from '../controllers/assignedPolicy.controller.js';

const router = express.Router();

router.post('/assign', assignPolicy);
router.get('/fecthAllUnassigned', fecthAllUnassignedPolicies);
router.get('/addAssign', addAssignPolicy);

export default router;