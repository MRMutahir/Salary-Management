import { sendResponse } from "../helpers/common.js";
import {
  getUserData,
  getUserWorkData,
  getUserEducationData,
} from "../services/userAggregation.js";

const fetchUserProfile = async (req, res, next) => {
  const { userID } = req.params;
  if (!userID) sendResponse(res, "User id is not found", false, 401);
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const userData = await getUserData(userID, page, limit);
    return sendResponse(
      res,
      "User data retrieved successfully",
      true,
      200,
      userData
    );
  } catch (error) {
    console.error(`Error fetching user data: ${error.message}`);
    next(error);
  }
};

const fetchUserWork = async (req, res, next) => {
  const { userID } = req.params;
  if (!userID) sendResponse(res, "User id is not found", false, 401);
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const workData = await getUserWorkData(userID, page, limit);
    return sendResponse(
      res,
      "User work data retrieved successfully",
      true,
      200,
      workData
    );
  } catch (error) {
    console.error(`Error fetching user work data: ${error.message}`);
    next(error);
  }
};

const fetchUserEducation = async (req, res, next) => {
  const { userID } = req.params;
  if (!userID) sendResponse(res, "User id is not found", false, 401);
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  try {
    const educationData = await getUserEducationData(userID, page, limit);
    return sendResponse(
      res,
      "User education data retrieved successfully",
      true,
      200,
      educationData
    );
  } catch (error) {
    console.error(`Error fetching user education data: ${error.message}`);
    next(error);
  }
};

export { fetchUserProfile, fetchUserWork, fetchUserEducation };
