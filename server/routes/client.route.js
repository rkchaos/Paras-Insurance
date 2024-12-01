import express from "express";
import auth from "../middleware/auth.middleware.js";
import { fetchCondenseInfo, fetchAllData, register, login, logout, forgotPassword, resetPassword } from "../controllers/client.controller.js";

const router = express.Router();

router.get("/fetchCondenseInfo", auth, fetchCondenseInfo);
router.get("/fetchAllData", auth, fetchAllData);
router.post("/register", register);
router.post("/login", login);
router.delete("/logout", auth, logout);
router.get("/forgotPassword", forgotPassword);
router.patch("/resetPassword", resetPassword);

export default router;