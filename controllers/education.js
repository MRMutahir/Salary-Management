import mongoose from "mongoose";
import { sendResponse } from "../helpers/common.js";
import {
  newEducation,
  educationFind,
  educationFindByIDAndUpdate,
} from "../services/education.js";

const createEducation = async (req, res, next) => {
  const {
    userID,
    degree,
    institution,
    startDate,
    endDate,
    fieldOfStudy,
    description,
    currentlyStudying,
  } = req.body;

  if (
    !userID ||
    !degree ||
    !institution ||
    !startDate ||
    (currentlyStudying === undefined && !endDate)
  ) {
    return sendResponse(res, "Missing required fields", false, 400);
  }

  try {
    const existing = await educationFind({ userID, degree, institution, isDeleted: false });
    if (!existing) {
      const payload = {
        userID,
        degree,
        institution,
        startDate,
        endDate,
        fieldOfStudy,
        description,
        currentlyStudying,
      };

      const newEdu = await newEducation(payload);
      if (newEdu) {
        return sendResponse(
          res,
          "Education created successfully",
          true,
          201
        );
      } else {
        return sendResponse(
          res,
          "Failed to create Education",
          false,
          500
        );
      }
    } else {
      return sendResponse(res, "Education already exists", false, 403);
    }
  } catch (error) {
    console.error(`Error creating education: ${error.message}`);
    next(error);
  }
};

const updateEducation = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const payload = {};
    const edu = await educationFind({
      userID: new mongoose.Types.ObjectId(reqBody.userID),
      isDeleted: false,
    });

    if (!edu) {
      return sendResponse(res, "Education not found", false, 404);
    }

    for (const [key, value] of Object.entries(reqBody)) {
      if (value !== undefined && value !== null && value !== "") {
        payload[key] = value;
      }
    }

    const updatedEdu = await educationFindByIDAndUpdate(
      { _id: edu._id },
      payload
    );

    if (updatedEdu) {
      return sendResponse(
        res,
        "Education updated successfully",
        true,
        200
      );
    } else {
      return sendResponse(res, "Failed to update Education", false, 404);
    }
  } catch (error) {
    console.error(`Error updating education: ${error.message}`);
    next(error);
  }
};

const   getEducationById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const education = await educationFind({
      _id: id,
      isDeleted: false,
    });

    if (education) {
      return sendResponse(
        res,
        "Education retrieved successfully",
        true,
        200,
        education
      );
    } else {
      return sendResponse(res, "Education not found", false, 404);
    }
  } catch (error) {
    console.error(`Error retrieving education: ${error.message}`);
    next(error);
  }
};

const deleteEducationById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const educationDeleted = await educationFindByIDAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { isDeleted: true }
    );

    if (educationDeleted) {
      return sendResponse(
        res,
        "Education deleted successfully",
        true,
        200
      );
    } else {
      return sendResponse(res, "Education not found", false, 404);
    }
  } catch (error) {
    console.error(`Error deleting education: ${error.message}`);
    next(error);
  }
};

export {
  createEducation,
  updateEducation,
  getEducationById,
  deleteEducationById,
};
