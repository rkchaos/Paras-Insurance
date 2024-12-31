import express from 'express';
import { fetchAllPolicies, createPolicy, fetchAllPolicyFields, fetchEveryPolicyId } from '../controllers/policy.controller.js';

const router = express.Router();

router.get('/fetchAll', fetchAllPolicies);
router.post('/create', createPolicy);
router.get('/fetchAllFields', fetchAllPolicyFields);
router.get('/fetchEveryPolicyId', fetchEveryPolicyId);

export default router;