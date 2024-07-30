import express from "express";
import { userget } from "../controllers/users.js";
const userRoutes = express.Router();

userRoutes.get("/demo", userget);

export { userRoutes };
