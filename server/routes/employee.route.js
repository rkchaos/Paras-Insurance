import express from 'express';
import { addEmployee, createEmployee, deleteEmployee, fetchAllEmployees } from '../controllers/employee.controller.js';

const router = express.Router();

router.post('/create', createEmployee);
router.post('/add', addEmployee);
router.delete('/delete', deleteEmployee);
router.get('/fetchAll', fetchAllEmployees);

export default router;