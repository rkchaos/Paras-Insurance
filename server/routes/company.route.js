import express from 'express';
import { addCompanyPolicy, createCompany, deleteCompany, removeCompanyPolicy, fetchAllCompanies, updateCompany, fetchCompanyPoliciesByType, sendCompanyPolicies } from '../controllers/company.controller.js';

const router = express.Router();

router.post('/create', createCompany);
router.get('/fetchAll', fetchAllCompanies);
router.put('/update', updateCompany);
router.delete('/delete', deleteCompany);
router.post('/addPolicy', addCompanyPolicy);
router.delete('/removePolicy', removeCompanyPolicy);
router.get('/fetchPolicyByType', fetchCompanyPoliciesByType);
router.put('/sendCompanyPolicies', sendCompanyPolicies);

export default router;