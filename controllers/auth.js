import {
  comparePassword,
  hashPassword,
  sendResponse,
} from "../helpers/common.js";
import { registerUser, findUser } from "../services/auth.js";

const register = async (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email) {
      return sendResponse(res, "Email is required", false, 400);
  }

  if (!password) {
      return sendResponse(res, "Password is required", false, 400);
  }
  console.log('password', password)

  try {
      const existingUser = await findUser({ email });
      if (existingUser) {
          return sendResponse(res, "Please choose another email address because this email is already in use.", false, 409);
      }
      const secretPassword = await hashPassword(password);
      const user = await registerUser({ email, password: secretPassword });

      if (user) {
          return sendResponse(res, "User registered successfully", true, 201);
      } else {
          return sendResponse(res, "Registration failed", false, 500);
      }
  } catch (error) {
      next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await findUser({ email });

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      sendResponse(res, "Invalid Password", true, 200);
    }

    sendResponse(
      res,
      "Congratulations, you have successfully logged in",
      true,
      200
    );
  } catch (error) {
    next(error);
  }
};

export { register, login };
