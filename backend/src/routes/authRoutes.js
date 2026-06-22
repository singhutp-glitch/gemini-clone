import express from "express";
import authController from "../controllers/authController.js";
import authValidator from '../validators/authValidator.js'
import loginValidator from "../validators/loginValidator.js";

const router = express.Router();

router.post("/register", authValidator,authController.register);
router.post("/login", loginValidator,authController.login);

export default router;