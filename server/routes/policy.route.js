import express from 'express';
import { fetchAllPolicies, createPolicy, fetchAllPolicyFields } from '../controllers/policy.controller.js';

const router = express.Router();

router.get('/fetchAll', fetchAllPolicies);
router.post('/create', createPolicy);
router.get('/fetchAllFields', fetchAllPolicyFields);

export default router;