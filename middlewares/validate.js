import { validationResult } from "express-validator";
import { sendResponse } from "../helpers/common.js";
const validate = async (req, res, next) => {
  const errors = validationResult(req);
  const error = {};
  if (!errors.isEmpty()) {
    errors.array().map((err) => (error[err.path] = err.msg));
    return res.status(422).json({ error, success: false });
  }
  next();
};

const checkFileExistsInReq = async (req, res, next) => {
  const file = req.file
  if (!file) {
    return sendResponse(res, "file required", false, 400);
  }
  next()
};


export { validate, checkFileExistsInReq };
