import mongoose from "mongoose";
import { envKeys } from "../config/keys.js";

const tokenSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    tokenType: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
      expires: envKeys.EMAIL_TOKEN_EXPIRY,
    },
  },
  {
    versionKey: false,
  }
);

const Token = mongoose.model("Tokens", tokenSchema);
export { Token };
