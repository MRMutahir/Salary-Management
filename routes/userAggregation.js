import express from "express";
import {
  fetchUserEducation,
  fetchUserProfile,
  fetchUserWork,
} from "../controllers/userAggregation.js";
import { param } from "express-validator";
import { validate } from "../middlewares/validate.js";


const userAggregationRoutes = express.Router();

userAggregationRoutes.get(
  "/profile/:userID",
  param("userID").isMongoId().withMessage("Invalid User ID"),
  validate,
  fetchUserProfile
);

userAggregationRoutes.get(
  "/work/:userID",
  param("userID").isMongoId().withMessage("Invalid User ID"),
  validate,
  fetchUserWork
);

userAggregationRoutes.get(
  "/education/:userID",
  param("userID").isMongoId().withMessage("Invalid User ID"),
  validate,
  fetchUserEducation
);

export { userAggregationRoutes };
