import express from "express";
import authController from "../controller/auth.controller.js";
import authService from "../service/auth.service.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authService.userAuth, authController.logout);

export default router;