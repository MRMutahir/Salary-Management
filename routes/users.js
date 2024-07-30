import express from "express";
import {
  createProfile,
  getProfile,
  deleteProfile,
  allProfile
} from "../controllers/users.js";

const userRoutes = express.Router();

// Define routes
userRoutes.post("/profile/:id", createProfile);
userRoutes.get("/profile/:id", getProfile);
userRoutes.delete("/profile/:id", deleteProfile);


userRoutes.get("/profiles", allProfile);

// Export routes
export { userRoutes };
