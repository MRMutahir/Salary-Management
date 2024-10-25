import express from "express";
import {
  createEducation,
  updateEducation,
  getEducationById,
  deleteEducationById,
} from "../controllers/education.js";
import { check } from "express-validator";
import { validate } from "../middlewares/validate.js";

const educationRoutes = express.Router();

// Define routes
educationRoutes.post(
  "/education",
  [
    check("userID").notEmpty().withMessage("Enter a user ID"),
    check("degree").notEmpty().withMessage("Enter a degree"),
    check("institution").notEmpty().withMessage("Enter an institution"),
    check("startDate").notEmpty().withMessage("Enter a start date"),
    check("endDate").optional().isString(),
    check("fieldOfStudy").optional().isString(),
    check("description").optional().isString(),
    check("currentlyStudying").notEmpty().isBoolean(),
  ],
  validate,
  createEducation
);

educationRoutes.put(
  "/education",
  [
    check("userID").notEmpty().withMessage("Enter a user ID"),
    check("degree").optional().isString(),
    check("institution").optional().isString(),
    check("startDate").optional().isString(),
    check("endDate").optional().isString(),
    check("fieldOfStudy").optional().isString(),
    check("description").optional().isString(),
    check("currentlyStudying").optional().isBoolean(),
  ],
  validate,
  updateEducation
);

educationRoutes.get("/education/:id", getEducationById);

educationRoutes.delete("/education/:id", deleteEducationById);

// Export routes
export { educationRoutes };
