import express from "express";
import { fetchUserData } from "../controllers/userAggregation.js";

const userAggregationRoutes = express.Router();

userAggregationRoutes.get("/:userID", fetchUserData);

export { userAggregationRoutes };
