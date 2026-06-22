import express from "express";
import authController from "../controllers/authController.js";
import authValidator from '../validators/authValidator.js'

const router = express.Router();

router.post("/register", authValidator,authController.register);
router.post("/login", authValidator,authController.login);

export default router;