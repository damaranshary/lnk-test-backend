import express from "express";
import emailController from "../controller/email.controller.js";
import authService from "../service/auth.service.js";
import validationService from "../service/validation.service.js";

const router = express.Router();

router.post("/send", authService.userAuth, validationService.validateEmailRequest, emailController.sendEmail);
router.get("/inbox", authService.userAuth, emailController.getInboxEmail);
router.get("/sent", authService.userAuth, emailController.getSentEmail);

export default router;