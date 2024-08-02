import { sendResponse } from "../helpers/common.js";
import { getUserData } from "../services/userAggregation.js";

const fetchUserData = async (req, res, next) => {
  const { userID } = req.params;
  const option = req.query.option;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const userData = await getUserData(userID, option, page, limit);

    return sendResponse(res, "User data retrieved successfully", true, 200,userData);
    // if (true) {
    // } else {
    // }
  } catch (error) {
    console.error(`Error fetching user data: ${error.message}`);
    next(error);
  }
};

export { fetchUserData };
