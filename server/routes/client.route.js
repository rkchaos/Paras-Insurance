import express from 'express';
import auth from '../middleware/auth.middleware.js';
import upload from '../middleware/multer.middleware.js';
import { fetchCondenseInfo, register, login, logout, forgotPassword, resetPassword, fetchAllClients, deleteProfile, fetchProfileData, fetchPoliciesData, updateProfile, uploadProfileMedia } from '../controllers/client.controller.js';

const router = express.Router();

// create
router.post('/register', register);
router.post('/login', login);
// read
router.get('/fetchCondenseInfo', auth, fetchCondenseInfo);
router.get('/fetchProfileData', auth, fetchProfileData);
router.get('/fetchPoliciesData', auth, fetchPoliciesData);
router.get('/fetchAll', auth, fetchAllClients);
// update
router.post('/updateProfile', auth, updateProfile);
router.post('/uploadProfileMedia', auth, upload.any("files"), uploadProfileMedia);
// delete
router.delete('/logout', auth, logout);
router.delete('/deleteProfile', auth, deleteProfile);
// misc
router.get('/forgotPassword', forgotPassword);
router.patch('/resetPassword', resetPassword);

export default router;