import express from "express";
import auth from "../middleware/auth.middleware.js";
import { fetchCondenseInfo, fetchAllData, register, login, logout, forgotPassword, resetPassword, fetchAllCustomers, deleteProfile } from "../controllers/client.controller.js";

const router = express.Router();

router.get("/fetchCondenseInfo", auth, fetchCondenseInfo);
router.get("/fetchAllData", auth, fetchAllData);
router.post("/register", register);
router.get("/fetchAll", auth, fetchAllCustomers);
router.post("/login", login);
router.delete("/logout", auth, logout);
router.get("/forgotPassword", forgotPassword);
router.patch("/resetPassword", resetPassword);
router.delete("/deleteProfile", auth, deleteProfile);

export default router;