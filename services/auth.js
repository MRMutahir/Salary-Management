import { signToken } from "../config/jwt.js";
import { sendResponse } from "../helpers/common.js";
import { Users } from "../models/Users.js";
import bcrypt from "bcryptjs";
// import messages from "../config/messages.js"; // Assuming messages contains error messages

const registerUser = async (payload) => {
  try {
    const user = await Users.create(payload);
    return user;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

const authenticateByEmail = async (payload) => {
  try {
    const user = await Users.findOne({ email: payload.email });
    if (!user) throw new Error(`User not found: ${messages.accountNotExist}`);
    await validateUser(payload, user);
    return await generateJWTToken(user);
  } catch (error) {
    throw new Error(`Error authenticating user: ${error.message}`);
  }
};

const validateUser = async (payload, user) => {
  if (!user) {
    throw new Error(`Authentication failed: ${messages.accountNotExist}`);
  }
  if (!comparePassword(payload.password || "", user.password)) {
    throw new Error(`Authentication failed: ${messages.incorrectPassword}`);
  }
  if (!user.isVerified) {
    throw new Error(`Authentication failed: ${messages.accountNotVerified}`);
  }
  if (!user.isEnabled) {
    throw new Error(`Authentication failed: ${messages.accountNotActive}`);
  }
};

const generateJWTToken = async (user) => {
  const payload = {
    email: user.email,
    id: user._id,
    time: Date.now(),
  };
  const authToken = await signToken(payload);
  return authToken;
};

export { registerUser, authenticateByEmail };
