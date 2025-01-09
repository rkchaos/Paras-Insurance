import express from 'express';
import auth from '../middleware/auth.middleware.js';
import upload from '../middleware/multer.middleware.js';
import { createSip, fetchAllSips, fetchAllSipsData, uploadSipMedia } from '../controllers/sip.controller.js';

const router = express.Router();

// create
router.post('/create', auth, createSip);
router.post('/uploadMedia', auth, upload.any("files"), uploadSipMedia);
// read
router.get('/fetchAllData', auth, fetchAllSipsData);
router.get('/fetchAllSips', auth, fetchAllSips);
// delete ?

export default router;