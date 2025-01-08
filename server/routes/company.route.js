import express from 'express';
import { addCompanyPolicy, createCompany, deleteCompany, removeCompanyPolicy, fetchAllCompanies, updateCompany, fetchCompanyPoliciesByType, sendCompanyPolicies } from '../controllers/company.controller.js';

const router = express.Router();

// create
router.post('/create', createCompany);
router.post('/addPolicy', addCompanyPolicy);
// read
router.get('/fetchAll', fetchAllCompanies);
// update
router.put('/update', updateCompany);
// delete
router.delete('/delete', deleteCompany);
router.delete('/removePolicy', removeCompanyPolicy);
// misc
router.get('/fetchPolicyByType', fetchCompanyPoliciesByType);
router.put('/sendCompanyPolicies', sendCompanyPolicies);

export default router;