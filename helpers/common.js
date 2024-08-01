import pkg from "log4js";
import pino from "pino";
import PinoColada from "pino-colada";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { saveToken } from "../services/tokenService.js";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
} from "unique-names-generator";

const { getLogger, configure } = pkg;

configure({
  appenders: {
    error: {
      type: "file",
      filename: "logs/error.log",
      maxLogSize: 100 * 1024 * 1024, // 100Mb
      level: "error",
      backups: 3,
      compress: true,
    },
    info: {
      type: "file",
      filename: "logs/info.log",
      maxLogSize: 100 * 1024 * 1024, // 100Mb
      level: "info",
      backups: 3,
      compress: true,
    },
  },
  categories: {
    default: { appenders: ["info", "error"], level: "DEBUG" },
    info: { appenders: ["info"], level: "info", enableCallStack: true },
    error: { appenders: ["error"], level: "error", enableCallStack: true },
  },
});

const logger = pino({
  prettifier: PinoColada,
});

const prettyLog = (msg, label = "info") => {
  if (label === null) infoLogger.info(msg);
  else logger.info(label + " :>> " + msg);
};

const prettyErrorLog = (error) => {
  logger.error(error);
};

const log2File = (msg, type) => {
  const logger4js = getLogger(type);
  logger.level = type;
  logger4js[type](msg);
};

const sendResponse = async (
  res,
  message,
  success = true,
  code = 200,
  data = null
) => {
  return res.status(code).json({ message, success, data });
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const comparePassword = async (password, hashPassword) => {
  const isMatch = await bcrypt.compareSync(password, hashPassword);
  if (isMatch) {
    // console.log("isMatLogin successfulch", isMatch);
    return isMatch;
  } else {
    console.log("Invalid credentials", isMatch);
  }
};

const generateToken = async (userId, tokenType) => {
  const buffer = crypto.randomBytes(3);
  const code = parseInt(buffer.toString("hex"), 16).toString().slice(0, 6);

  const token = await saveToken({
    userID: userId,
    token: code,
    tokenType: tokenType,
  });

  return token.token;
};

const accountVerificationCodeByEmail = async (userId) => {
  return generateToken(userId, "email-token");
};

const generateResetPasswordToken = async (userId) => {
  return generateToken(userId, "reset-password-token");
};

const generateDisplayName = async (firstName, lastName) => {
  const uniqueId = crypto.randomBytes(3).toString("hex"); // 3 bytes = 6 hex characters

  const displayName = `${firstName}.${lastName}.${uniqueId}`;
  return displayName;
};
export {
  prettyLog,
  prettyErrorLog,
  log2File,
  sendResponse,
  hashPassword,
  comparePassword,
  accountVerificationCodeByEmail,
  generateResetPasswordToken,
  generateToken,
  generateDisplayName,
};
