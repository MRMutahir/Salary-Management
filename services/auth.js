import { signToken } from "../config/jwt.js";
import { comparePassword } from "../helpers/common.js";
import { Users } from "../models/Users.js";

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
    if (!user)
      throw new Error(
        `User not found: No account exists with the provided email.`
      );
    await validateUser(payload, user);
    return await generateJWTToken(user);
  } catch (error) {
    throw new Error(`Error authenticating user: ${error.message}`);
  }
};

const validateUser = async (payload, user) => {
  if (!user) {
    throw new Error(
      `Authentication failed: No account exists with the provided email.`
    );
  }
  if (!comparePassword(payload.password || "", user.password)) {
    throw new Error(`Authentication failed: Incorrect password.`);
  }
  if (!user.isVerified) {
    throw new Error(`Authentication failed: The account is not verified.`);
  }
  if (!user.isEnabled) {
    throw new Error(`Authentication failed: The account is not active.`);
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
