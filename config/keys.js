import { configDotenv } from "@dotenvx/dotenvx";
configDotenv();
const envKeys = {
  dbUri: process.env.MONGODB_URI,
  port: process.env.PORT || 3000,
  EMAIL_TOKEN_EXPIRY: "12h",
  MAILTRAP_TOKEN: process.env.MAILTRAP_TOKEN,
  MAILTRAP_ENDPOINT: process.env.MAILTRAP_ENDPOINT,
};

export { envKeys };
