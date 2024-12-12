import mongoose from "mongoose";
import { generateDisplayName, sendResponse } from "../helpers/common.js";
import { findUser, findUserAndUpdate, findAllUser } from "../services/users.js";

const createProfile = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      age,
      gender,
      profileImage,
      dateOfBirth,
      nicNumber,
      relationshipStatus,
      country,
      city,
      userID,
    } = req.body;

    // Generate a unique display name
    let newDisplayName = await generateDisplayName(firstName, lastName);

    // Check if the user already exists
    const existingUser = await findUser({ _id: userID });

    if (existingUser && existingUser.isDeleted) {
      return sendResponse(
        res,
        "User not found. The user may have been deleted.",
        false,
        404
      );
    }

    // Update the user's profile with the new display name and other details
    const payload = {
      firstName,
      lastName,
      age,
      gender,
      profileImage,
      dateOfBirth,
      nicNumber,
      relationshipStatus,
      country,
      city,
      displayName: newDisplayName,
    };

    const newProfile = await findUserAndUpdate(userID, payload);

    if (!newProfile) {
      return sendResponse(res, "Profile creation failed", false, 500);
    }

    return sendResponse(
      res,
      "Profile created successfully",
      true,
      201,
      newProfile
    );
  } catch (error) {
    console.error(`Error creating profile: ${error.message}`);
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  const { userID, ...updateData } = req.body;

  try {
    const user = await findUser({ _id: userID, isDeleted: false });
    if (!user) {
      return sendResponse(res, "User not found", false, 404);
    }

    const payload = {};
    for (const [key, value] of Object.entries(updateData)) {
      if (value !== undefined && value !== null && value !== "") {
        payload[key] = value;
      }
    }

    const updatedProfile = await findUserAndUpdate({ _id: user._id }, payload);
    if (!updatedProfile) {
      return sendResponse(res, "Profile update failed", false, 500);
    }
    return sendResponse(
      res,
      "Profile updated successfully",
      true,
      200,
      updatedProfile
    );
  } catch (error) {
    console.error(`Error updating profile: ${error.message}`);
    next(error);
  }
};
const getProfile = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await findUser({ _id: id, isDeleted: false });
    if (!user) {
      return sendResponse(res, "User not found", false, 404);
    }
    return sendResponse(
      res,
      "User profile retrieved successfully",
      true,
      200,
      user
    );
  } catch (error) {
    console.error(`Error retrieving user profile: ${error.message}`);
    return sendResponse(res, "Internal Server Error", false, 500);
  }
};

const deleteProfile = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await findUser({ _id: id, isDeleted: false });
    if (!user) {
      return sendResponse(res, "User not found", false, 404);
    }

    const userDeleted = await findUserAndUpdate(id, { isDeleted: true });
    if (!userDeleted) {
      return sendResponse(res, "Failed to delete user", false, 500);
    }
    return sendResponse(res, "User profile successfully deleted", true, 200);
  } catch (error) {
    console.error(`Error deleting user profile: ${error.message}`);
    return sendResponse(res, "Internal Server Error", false, 500);
  }
};



const allProfile = async (req, res, next) => {
  try {
    const users = await findAllUser(
      { isDeleted: false },
      {
        _id: 1,
        email: 1,
        isVerified: 1,
        firstName: 1,
        lastName: 1, // Include other necessary fields
      }
    );
    if (!users.length) {
      return sendResponse(res, "No users found", false, 404);
    }
    return sendResponse(
      res,
      "User profiles retrieved successfully",
      true,
      200,
      users
    );
  } catch (error) {
    console.error(`Error retrieving all profiles: ${error.message}`);
    return sendResponse(res, "Internal Server Error", false, 500);
  }
};

const uploadImage = async (req, res, next) => {

  console.log('file', file)
  console.log('req.file', req.file)
  return sendResponse(
    res,
    "file retrieved successfully",
    true,
    200,
    file
  );
}

export { createProfile, getProfile, deleteProfile, allProfile, updateProfile, uploadImage };
