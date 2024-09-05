import express from "express";
import {
  createYearController,
  editYearController,
  deleteYearController,
} from "../controllers/year.controller.js";
import { check, param } from "express-validator";
import { validate } from "../middlewares/validate.js";

const userYearRoute = express.Router();

userYearRoute.post(
  "/year",
  [
    check("YearName").notEmpty().withMessage("Enter a year name"),
    check("description").notEmpty().withMessage("Enter a buket description"),
    check("isCurrent").notEmpty().withMessage("Enter a buket status"),
    check("timeAndDate").notEmpty().withMessage("Enter a  time and date"),
  ],
  validate,
  createYearController
);

userYearRoute.put(
  "/year/:id",
  [param("id").isMongoId().withMessage("Invalid user ID format")],
  validate,
  editYearController
);

userYearRoute.delete(
  "/year/:id",
  [param("id").isMongoId().withMessage("Invalid user ID format")],
  validate,
  deleteYearController
);

export { userYearRoute };
