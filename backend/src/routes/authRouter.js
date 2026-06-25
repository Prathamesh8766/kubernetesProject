import express from "express";
import { register, login } from "../controller/authController.js";

const router = express.Router();

// Register user
// POST /api/auth/register
router.post("/register", register);

// Login user
// POST /api/auth/login
router.post("/login", login);

export default router;