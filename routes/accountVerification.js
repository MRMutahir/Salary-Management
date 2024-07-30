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
    check("code").isEmail().withMessage("Enter a valid code"),
    check("newPassword").isEmail().withMessage("Enter a new password"),
  ],
  // validate,
  resetPassword
);

verificationRoutes.post(
  "/resend-code",
  [
    check("userID").isEmail().withMessage("Enter a user ID"),
    check("tokenType").isEmail().withMessage("Enter a token type"),
  ],
  resendCode
);

export { verificationRoutes };
