import pkg from "log4js";
import pino from "pino";
import PinoColada from "pino-colada";
import bcrypt from "bcrypt";
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
    // res.status(200).json({ message: "Login successful" });
    console.log("isMatLogin successfulch", isMatch);
    return isMatch
  } else {
    // res.status(401).json({ error: "Invalid credentials" });
    console.log("Invalid credentials", isMatch);
  }
};
export {
  prettyLog,
  prettyErrorLog,
  log2File,
  sendResponse,
  hashPassword,
  comparePassword,
};
