import express from "express";
import {
  createWorkExperience,
  deleteWorkExperienceById,
  getWorkExperienceById,
  // updateWorkExperience,
} from "../controllers/work.js";
import { check } from "express-validator";
import { validate } from "../middlewares/validate.js";

const userWorkRoutes = express.Router();

// Define routes
userWorkRoutes.post(
  "/experience",
  [
    check("userID").notEmpty().withMessage("Enter a user ID"),
    check("jobTitle").notEmpty().withMessage("Enter a job Title"),
    check("company").notEmpty().withMessage("Enter a company"),
    check("startDate").notEmpty().withMessage("Enter a start Date"),
    check("endDate").optional().isString().withMessage("Enter a valid end Date"),
    check("description").notEmpty().withMessage("Enter a description"),
    check("location").notEmpty().withMessage("Enter a location"),
    check("currentlyWorking")
      .notEmpty()
      .withMessage("Enter if currently working"),
  ],
  validate,
  createWorkExperience
);

// userWorkRoutes.put(
//   "/experience",
//   [
//     check("userID").notEmpty().withMessage("Enter a user ID"),
//     check("jobTitle").optional().isString(),
//     check("company").optional().isString(),
//     check("startDate").optional().isString(),
//     check("endDate").optional().isString(),
//     check("description").optional().isString(),
//     check("location").optional().isString(),
//     check("currentlyWorking").optional().isBoolean(),
//   ],
//   validate,
//   updateWorkExperience
// );

userWorkRoutes.get("/experience/:id", getWorkExperienceById);

userWorkRoutes.delete("/experience/:id", deleteWorkExperienceById);

// Export routes
export { userWorkRoutes };
