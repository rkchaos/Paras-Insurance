import express from 'express';
import { addEmployee, createEmployee, removeEmployeeAccess, fetchAllEmployees } from '../controllers/employee.controller.js';

const router = express.Router();

router.post('/create', createEmployee);
router.post('/add', addEmployee);
router.delete('/removeAccess', removeEmployeeAccess);
router.get('/fetchAll', fetchAllEmployees);

export default router;