import express from "express";
import { check } from "express-validator";
import { validate } from "../middlewares/validate.js";
import { accountVerification } from "../controllers/accountVerification.js";

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

export { verificationRoutes };
