import express from "express";
import { register } from "../controllers/auth.js";
import { check } from "express-validator";
import { validate } from "../middlewares/validate.js";

const authRoutes = express.Router();

authRoutes.get(
  "/register",
  check("email").isEmail().withMessage("Enter a valid email"),
  check("password").isLength({min:15}).withMessage("Password must be at least 15 characters long"),
  validate,
  register
);

export { authRoutes };
