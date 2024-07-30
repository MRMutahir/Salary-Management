import { verifyToken } from "../config/jwt.js";
import { sendResponse } from "../helpers/common.js";

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return sendResponse(
      res,
      "Authorization header missing or malformed",
      true,
      401
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = await verifyToken(token);
    // console.log("user", user);
    req.user = user;
    next();
  } catch (error) {
    return sendResponse(res, "Invalid or expired token", true, 401);
  }
};

export { authenticate };
