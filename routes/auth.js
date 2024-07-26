import express from "express";
import { login, register } from "../controllers/auth.js";
import { check } from "express-validator";
import { validate } from "../middlewares/validate.js";


const authRoutes = express.Router();

authRoutes.post(
  "/register",
  check("email").isEmail().withMessage("Enter a valid email"),
  check("password")
    .isLength({ min: 15 })
    .withMessage("Password must be at least 15 characters long"),
  validate,
  register
);

authRoutes.post(
  "/login",
  check("email").isEmail().withMessage("Enter a valid email"),
  check("password")
    .isLength({ min: 15 })
    .withMessage("Password must be at least 15 characters long"),
  validate,
  login
);


export { authRoutes };
