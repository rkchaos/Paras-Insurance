import express from 'express';
import { createClientPolicy, fecthAllUnassignedPolicies, fecthAllAssignedPolicies, countAllAssignedPolicies, assignPolicy, addAvailableCompanyPolicies } from '../controllers/clientPolicy.controller.js';

const router = express.Router();

// create
router.post('/assign', createClientPolicy);
// read
router.get('/fecthAllUnassigned', fecthAllUnassignedPolicies);
router.get('/fecthAllAssigned', fecthAllAssignedPolicies);
router.get('/countAllAssigned', countAllAssignedPolicies);
// update
router.get('/addAssign', assignPolicy);
router.post('/addAvailableCompany', addAvailableCompanyPolicies)

export default router;