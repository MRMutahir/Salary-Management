import {
  generateResetPasswordToken,
  hashPassword,
  sendResponse,
} from "../helpers/common.js";
import { deleteToken, findToken } from "../services/tokenService.js";
import { findUser, findUserAndUpdate } from "../services/users.js";

const accountVerification = async (req, res, next) => {
  const { email, code } = req.body;

  // Validate email and code presence
  if (!email) return sendResponse(res, "Email is required", false, 400);
  if (!code) return sendResponse(res, "Code is required", false, 400);

  console.log("code", code);
  console.log("email", email);

  try {
    // Find the token
    const token = await findToken(code);
    if (!token)
      return sendResponse(res, "Invalid or expired token", false, 401);
    // Update the user to be verified
    const isVerifiedUser = await findUserAndUpdate(token.userID, {
      isVerified: true,
    });
    if (!isVerifiedUser) return sendResponse(res, "User not found", false, 404);
    // after isVerifiedUser delete token
    await deleteToken(token);
    // Send success response
    sendResponse(res, "You are now verified", true, 200);
  } catch (error) {
    console.error(`Error during account verification: ${error}`);
    sendResponse(res, "Internal Server Error", false, 500);
  }
};

const resetPasswordToken = async (req, res, next) => {
  const { email } = req.body;
  if (!email) sendResponse(res, "Enter a valid email", false, 404);
  const user = await findUser({ email });
  if (user) {
    const token = await generateResetPasswordToken(user._id);
    sendResponse(res, "Your reset password token", true, 200, token);
  } else {
    sendResponse(res, "Your are not authenticate user", false, 404);
  }
};

const resetPassword = async (req, res, next) => {
  const { code, newPassword } = req.body; // Extract code and newPassword from request body

  if (!code) {
    return sendResponse(res, "Code not found", false, 404);
  }

  if (!newPassword) {
    return sendResponse(res, "Password not found", false, 404);
  }

  try {
    const token = await findToken(code);
    if (!token) {
      return sendResponse(res, "Invalid code", false, 404);
    }

    const user = await findUser({ _id: token.userID });
    if (!user) {
      return sendResponse(res, "User not found", false, 404);
    }

    const secretPassword = await hashPassword(newPassword);

    const updatePassword = await findUserAndUpdate(user._id, {
      password: secretPassword,
    });
    if (updatePassword) {
      await deleteToken(token);
      return sendResponse(res, "New password successfully added", true, 200);
    } else {
      return sendResponse(res, "Failed to update password", false, 500);
    }
  } catch (error) {
    return sendResponse(res, "Internal server error", false, 500);
  }
};

export { accountVerification, resetPasswordToken, resetPassword };
