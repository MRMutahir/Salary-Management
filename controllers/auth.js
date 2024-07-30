import {
  accountVerificationCodeByEmail,
  comparePassword,
  hashPassword,
  sendResponse,
} from "../helpers/common.js";
import { sendEmail } from "../helpers/mailtrap.js";
import { authenticateByEmail, registerUser } from "../services/auth.js";
import { findUser } from "../services/users.js";

const register = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return sendResponse(res, "Email is required", false, 400);
  }

  if (!password) {
    return sendResponse(res, "Password is required", false, 400);
  }
  console.log("password", password);
  console.log("email", email);

  try {
    const existingUser = await findUser({ email });
    if (existingUser) {
      return sendResponse(
        res,
        "Please choose another email address because this email is already in use.",
        false,
        409
      );
    }
    const secretPassword = await hashPassword(password);
    const user = await registerUser({ email, password: secretPassword });
    const verificationCode = await accountVerificationCodeByEmail(user._id);
    const emailPayload = {
      obj: "Account Verification",
      code: verificationCode,
      category: "account verification email",
    };
    await sendEmail(
      user.email,
      emailPayload.obj,
      emailPayload.code,
      emailPayload.category
    );
    if (user) {
      return sendResponse(res, `User registered successfully`, true, 201);
    } else {
      return sendResponse(res, "Registration failed", false, 500);
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return sendResponse(res, "Enter a valid email", false, 400);
  }

  if (!password) {
    return sendResponse(res, "Enter a valid password", false, 400);
  }

  try {
    const user = await findUser({ email });

    if (!user) {
      return sendResponse(res, "User not found", false, 404);
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return sendResponse(res, "Invalid Password", false, 401);
    }

    if (!user.isVerified) {
      return sendResponse(
        res,
        "User not verified. Please verify your email before logging in.",
        false,
        403
      );
    }

    const authToken = await authenticateByEmail({email, password});
    return sendResponse(res, "Login successful", true, 200, authToken);
  } catch (error) {
    next(error);
  }
};

export { register, login };
