import express from 'express';
import { addAvailableCompanyPolicies, assignPolicy, createClientPolicy, fecthAllUnassignedPolicies } from '../controllers/clientPolicy.controller.js';

const router = express.Router();

router.post('/assign', createClientPolicy);
router.get('/fecthAllUnassigned', fecthAllUnassignedPolicies);
router.get('/addAssign', assignPolicy);
router.post('/addAvailableCompany', addAvailableCompanyPolicies)

export default router;