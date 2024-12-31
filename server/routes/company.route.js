import express from 'express';
import { addCompanyPolicy, createCompany, deleteCompany, deleteCompanyPolicy, fetchAllCompanies } from '../controllers/company.controller.js';

const router = express.Router();

// app.get('/companies', async (req, res) 
router.post('/create', createCompany);
// app.put('/companies/:id', async (req, res) 
router.get('/fetchAll', fetchAllCompanies);
// app.delete('/companies/:id', async (req, res) 
router.delete('/delete', deleteCompany);
// app.post('/companies/:id/policies', async (req, res)
router.post('/:companyId/policies', addCompanyPolicy);
// app.delete('/companies/:companyId/policies/:policyId', async (req, res)
router.delete('/:companyId/policies/:policyId', deleteCompanyPolicy);

export default router;