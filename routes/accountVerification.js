import express from "express";
import { check } from "express-validator";
import { validate } from "../middlewares/validate.js";
import {
  accountVerification,
  resetPasswordToken,
  resetPassword,
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

export { verificationRoutes };
