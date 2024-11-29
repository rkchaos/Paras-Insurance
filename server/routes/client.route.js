import express from "express";
import auth from "../middleware/auth.middleware.js";
import { register, login, logout } from "../controllers/client.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/logout", auth, logout);

export default router;