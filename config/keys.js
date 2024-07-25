import { configDotenv } from "@dotenvx/dotenvx";
configDotenv();
const envKeys = {
  dbUri: process.env.MONGODB_URI,
  port: process.env.PORT || 3000,
  EMAIL_TOKEN_EXPIRY: "12h",
};

export { envKeys };
