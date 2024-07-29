import mongoose from "mongoose";
import { envKeys } from "../config/keys.js";
import { prettyErrorLog, log2File, prettyLog } from "../helpers/common.js";

const connectDb = async () => {
  try {
    await mongoose.connect(envKeys.dbUri);
    prettyLog(`DB connected successfully`, "info");
    log2File(`DB connected successfully`, "info");
  } catch (error) {
    prettyErrorLog(`DB connection failed: ${error.message}`);
    log2File(`http://localhost:${envKeys.port}`, "error");
  }
};

export { connectDb };
