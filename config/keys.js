import { configDotenv } from "@dotenvx/dotenvx";
configDotenv()
const envKeys = {
  dbUri: process.env.MONGODB_URI,
  port: process.env.PORT || 3000,
};

export { envKeys };
