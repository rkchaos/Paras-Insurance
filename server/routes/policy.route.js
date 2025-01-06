import express from 'express';
import { createPolicy, fetchAllPolicies, fetchAllPolicyFields, fetchEveryPolicyId } from '../controllers/policy.controller.js';

const router = express.Router();

// create
router.post('/create', createPolicy);
// read
router.get('/fetchAll', fetchAllPolicies);
router.get('/fetchAllFields', fetchAllPolicyFields);
router.get('/fetchEveryPolicyId', fetchEveryPolicyId);

export default router;