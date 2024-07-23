import mongoose from "mongoose";
import { envKeys } from "../config/keys.js";

const connectDb = async () => {
  try {
    await mongoose.connect(envKeys.dbUri);
    console.log("DB connected successfully");
  } catch (error) {
    console.error("DB connection failed:", error.message);
  }
};

export { connectDb };
