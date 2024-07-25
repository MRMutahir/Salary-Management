import { sendResponse } from "../helpers/common.js";
import { findToken } from "../services/tokenService.js";
import { findUserAndUpdate } from "../services/users.js";

const accountVerification = async (req, res, next) => {
  const { email, code } = req.body;

  if (!email) return sendResponse(res, "Email is required", false, 400);
  if (!code) return sendResponse(res, "Code is required", false, 400);
  console.log("code", code);
  console.log(" email", email);

  try {
    const token = await findToken(code);
    if (!token)
      return sendResponse(res, "Invalid or expired token", false, 401);
    console.log('token', token)
    console.log('token.userID', token.userID)

    const isVerifiedUser = await findUserAndUpdate(token.userID, {
      isVerified: true,
    });
    console.log('isVerifiedUser', isVerifiedUser)
    if (!isVerifiedUser) return sendResponse(res, "User not found", false, 404);

    sendResponse(res, "You are now verified", true, 200);
  } catch (error) {
    console.error(`Error during account verification: ${error}`);
    sendResponse(res, "Internal Server Error", false, 500);
  }
};

export { accountVerification };
