import express from "express";
import {
  createProfile,
  updateProfile,
  getProfile,
  deleteProfile,
  allProfile,
} from "../controllers/users.js";
import { validate } from "../middlewares/validate.js";
import { body, param } from "express-validator";

const userRoutes = express.Router();

userRoutes.post(
  "/profile",
  [
    body("firstName").optional().trim().escape(),
    body("lastName").optional().trim().escape(),
    body("age")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Age must be a non-negative integer"),
    body("gender")
      .optional()
      .isIn(["Male", "Female", "Other", "Prefer not to say"])
      .withMessage("Invalid gender value"),
    body("profileImage").optional().trim().escape(),
    body("dateOfBirth")
      .optional()
      .isISO8601()
      .withMessage("Invalid Date format"),
    body("nicNumber").optional().trim().escape(),
    body("relationshipStatus")
      .optional()
      .isIn(["Single", "Married", "Divorced", "Widowed", "In a relationship"])
      .withMessage("Invalid relationship status value"),
    body("country").optional().trim().escape(),
    body("city").optional().trim().escape(),
  ],
  validate,
  createProfile
);

userRoutes.put(
  "/profile",
  [
    body("firstName").optional().trim().escape(),
    body("lastName").optional().trim().escape(),
    body("age")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Age must be a non-negative integer"),
    body("gender")
      .optional()
      .isIn(["Male", "Female", "Other", "Prefer not to say"])
      .withMessage("Invalid gender value"),
    body("profileImage").optional().trim().escape(),
    body("dateOfBirth")
      .optional()
      .isISO8601()
      .withMessage("Invalid Date format"),
    body("nicNumber").optional().trim().escape(),
    body("relationshipStatus")
      .optional()
      .isIn(["Single", "Married", "Divorced", "Widowed", "In a relationship"])
      .withMessage("Invalid relationship status value"),
    body("country").optional().trim().escape(),
    body("city").optional().trim().escape(),
  ],
  validate,
  updateProfile
);

userRoutes.get(
  "/profile/:id",
  [param("id").isMongoId().withMessage("Invalid user ID format")],
  validate,
  getProfile
);

userRoutes.delete(
  "/profile/:id",
  [param("id").isMongoId().withMessage("Invalid user ID format")],
  validate,
  deleteProfile
);

userRoutes.get("/profiles", allProfile);

// Export routes
export { userRoutes };
