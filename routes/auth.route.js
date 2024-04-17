import express from "express";
import authController from "../controller/auth.controller.js";
import authService from "../service/auth.service.js";
import validationService from "../service/validation.service.js";

const router = express.Router();

router.post("/register", validationService.validateRegisterRequest, authController.register);
router.post("/login", authController.login);
router.post("/logout", authService.userAuth, authController.logout);

export default router;