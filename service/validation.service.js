import { body, validationResult } from "express-validator";
import User from "../model/user.model.js";

const validateEmailRequest = [
  body("recipient").custom(async (value) => {
    const isRecipientExists = await User.findOne({
      email: value,
    });
    if (!isRecipientExists) {
      return Promise.reject("Recipient email not found");
    }
  }),
  body("recipient").custom(async (value, { req }) => {
    if (value === req.user.email) {
      return Promise.reject("You cannot send an email to yourself");
    }
  }),
  body("subject").notEmpty().withMessage("Subject is required"),
  body("description").notEmpty().withMessage("Description is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "failed", errors: errors.array() });
    }
    next();
  },
];

const validateRegisterRequest = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Email is invalid"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "failed", errors: errors.array() });
    }
    next();
  },
];

export default { validateEmailRequest, validateRegisterRequest };
