import { sendResponse } from "../helpers/common.js";
import { findUser, findUserAndUpdate, findAllUser } from "../services/users.js";
import mongoose from "mongoose";

const createProfile = async (req, res, next) => {
  const { id } = req.params;
  const requestBody = req.body;
  const user = await findUser({
    _id: new mongoose.Types.ObjectId(id),
    isDeleted: false,
  });

  // Check if the user exists
  if (!user) {
    return sendResponse(res, "User was Deleted", true, 404);
  }
  // Initialize an empty payload object
  const payload = {};

  // Populate the payload with non-empty values from requestBody
  for (const [key, value] of Object.entries(requestBody)) {
    if (value !== undefined && value !== null && value !== "") {
      payload[key] = value;
    }
  }

  try {
    // Validate if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(res, "Invalid user ID", true, 400);
    }

    // Find the user by ID
    const user = await findUser({ _id: new mongoose.Types.ObjectId(id) });

    // Check if the user exists
    if (!user) {
      return sendResponse(res, "User not found", true, 404);
    }

    // Update the user profile with the payload
    const updatedProfile = await findUserAndUpdate({ _id: id }, payload);

    // If update was not successful
    if (!updatedProfile) {
      return sendResponse(res, "Profile update failed", true, 500);
    }

    // Send response indicating success
    return sendResponse(res, "Profile updated successfully", false, 200);
  } catch (error) {
    // Log and handle unexpected errors
    console.error(`Error creating profile: ${error.message}`);
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Check if the ID is provided
    if (!id) {
      return sendResponse(res, "User ID is required", true, 400);
    }

    // Find the user by ID
    const user = await findUser({ _id: id, isDeleted: false });

    // Check if the user exists
    if (!user) {
      return sendResponse(res, "User not found", true, 404);
    }

    // Respond with the user profile
    return sendResponse(
      res,
      "User profile retrieved successfully",
      false,
      200,
      user
    );
  } catch (error) {
    // Log the error for debugging purposes
    console.error(`Error retrieving user profile: ${error}`);

    // Send an error response with status 500
    return sendResponse(res, "Internal Server Error", true, 500);
  }
};

const deleteProfile = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Check if the ID is provided
    if (!id) {
      return sendResponse(res, "User ID is required", true, 400);
    }

    // Find the user by ID and check if not already deleted
    const user = await findUser({ _id: id, isDeleted: false });

    // Check if the user exists
    if (!user) {
      return sendResponse(res, "User not found", true, 404);
    }

    // Mark the user as deleted
    const userDeleted = await findUserAndUpdate(
      { _id: id },
      { isDeleted: true }
    );

    // Check if the user deletion was successful
    if (!userDeleted) {
      return sendResponse(res, "Failed to delete user", true, 500);
    }

    // Respond with a success message
    return sendResponse(res, "User profile successfully deleted", false, 200);
  } catch (error) {
    // Log the error for debugging purposes
    console.error(`Error deleting user profile: ${error}`);

    // Send an error response with status 500
    return sendResponse(res, "Internal Server Error", true, 500);
  }
};

const allProfile = async (req, res, next) => {
  try {
    // Fetch all user profiles that are not marked as deleted
    const query = { isDeleted: false };
    const projection = {
      _id: 1,
      email: 1,
      isVerified: 1,
      firstName: 1,
    };

    const users = await findAllUser(query, projection);

    // Check if users exist
    if (!users || users.length === 0) {
      return sendResponse(res, "No users found", true, 404);
    }

    // Send response with the list of users
    return sendResponse(
      res,
      "User profiles retrieved successfully",
      false,
      200,
      users
    );
  } catch (error) {
    // Log the error for debugging purposes
    console.error(`Error retrieving all profiles: ${error.message}`);

    // Send an error response with status 500
    return sendResponse(res, "Internal Server Error", true, 500);
  }
};
export { createProfile, getProfile, deleteProfile, allProfile };
