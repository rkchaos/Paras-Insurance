import express from 'express';
import auth from '../middleware/auth.middleware.js';
import upload from '../middleware/multer.middleware.js';
import { createGeneralInsurance, fetchAllGeneralInsurances, fetchAllGeneralInsurancesData, uploadGeneralInsuranceMedia } from '../controllers/generalInsurance.controller.js';

const router = express.Router();

// create
router.post('/create', auth, createGeneralInsurance);
router.post('/uploadMedia', auth, upload.any("files"), uploadGeneralInsuranceMedia);
// read
router.get('/fetchAllData', auth, fetchAllGeneralInsurancesData);
router.get('/fetchAllGeneralInsurances', auth, fetchAllGeneralInsurances);
// delete ?

export default router;