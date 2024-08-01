import express from "express";
import { check } from "express-validator";
import { validate } from "../middlewares/validate.js";
import {
  accountVerification,
  resetPasswordToken,
  resetPassword,
  resendCode,
} from "../controllers/accountVerification.js";

const verificationRoutes = express.Router();

verificationRoutes.post(
  "/otpVerification",
  [
    check("email").isEmail().withMessage("Enter a valid email"),
    check("code").notEmpty().withMessage("Enter a valid code"),
  ],
  validate,
  accountVerification
);

verificationRoutes.post(
  "/reset-password-token",
  [check("email").isEmail().withMessage("Enter a valid email")],
  validate,
  resetPasswordToken
);

verificationRoutes.post(
  "/reset-password",
  [
    check("code").notEmpty().withMessage("Enter a valid code"),
    check("newPassword").notEmpty().withMessage("Enter a new password"),
  ],
  validate,
  resetPassword
);

verificationRoutes.post(
  "/resend-code",
  [
    check("userID").notEmpty().withMessage("Enter a user ID"),
    check("tokenType").notEmpty().withMessage("Enter a token type"),
  ],
  validate,
  resendCode
);

export { verificationRoutes };
