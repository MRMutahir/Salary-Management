import mongoose from "mongoose";
import { sendResponse } from "../helpers/common.js";
import { findUser } from "../services/users.js";
import {
  newWorkExperience,
  workExperienceFind,
  workExperienceFindByIDAndUpdate,
} from "../services/work.js";

const createWorkExperience = async (req, res, next) => {
  const {
    userID,
    jobTitle,
    company,
    startDate,
    endDate,
    description,
    location,
    currentlyWorking,
  } = req.body;

  if (
    !userID ||
    !jobTitle ||
    !company ||
    !startDate ||
    (!currentlyWorking && !endDate) ||
    !description ||
    !location
  ) {
    return sendResponse(res, "Missing required fields", false, 400);
  }

  try {
    const existing = await workExperienceFind({ userID, isDeleted: false });
    if (!existing) {
      const payload = {
        userID,
        jobTitle,
        company,
        startDate,
        endDate,
        description,
        location,
        currentlyWorking,
      };

      const newWork = await newWorkExperience(payload);
      if (newWork) {
        return sendResponse(
          res,
          "Work Experience created successfully",
          true,
          201
        );
      } else {
        return sendResponse(
          res,
          "Failed to create Work Experience",
          false,
          500
        );
      }
    } else {
      return sendResponse(res, "Work Experience already exists", false, 403);
    }
  } catch (error) {
    console.error(`Error creating work experience: ${error.message}`);
    next(error);
  }
};

// const updateWorkExperience = async (req, res, next) => {
//   try {
//     const reqBody = req.body;
//     const payload = {};
//     const work = await workExperienceFind({
//       userID: new mongoose.Types.ObjectId(reqBody.userID),
//       isDeleted: false,
//     });

//     if (!work) {
//       return sendResponse(res, "Work Experience not found", false, 404);
//     }

//     for (const [key, value] of Object.entries(reqBody)) {
//       if (value !== undefined && value !== null && value !== "") {
//         payload[key] = value;
//       }
//     }

//     const updatedExperience = await workExperienceFindByIDAndUpdate(
//       { userID: user._id },
//       payload
//     );

//     if (updatedExperience) {
//       return sendResponse(
//         res,
//         "Work Experience updated successfully",
//         true,
//         200
//       );
//     } else {
//       return sendResponse(res, "Failed to update Work Experience", false, 404);
//     }
//   } catch (error) {
//     console.error(`Error updating work experience: ${error.message}`);
//     next(error);
//   }
// };

const getWorkExperienceById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const workExperience = await workExperienceFind({
      _id: id,
      isDeleted: false,
    });

    if (workExperience) {
      return sendResponse(
        res,
        "Work Experience retrieved successfully",
        true,
        200,
        workExperience
      );
    } else {
      return sendResponse(res, "Work Experience not found", false, 404);
    }
  } catch (error) {
    console.error(`Error retrieving work experience: ${error.message}`);
    next(error);
  }
};

const deleteWorkExperienceById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const workExperienceDeleted = await workExperienceFindByIDAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { isDeleted: true }
    );

    if (workExperienceDeleted) {
      return sendResponse(
        res,
        "Work Experience deleted successfully",
        true,
        200
        // workExperienceDeleted
      );
    } else {
      return sendResponse(res, "Work Experience not found", false, 404);
    }
  } catch (error) {
    console.error(`Error deleting work experience: ${error.message}`);
    next(error);
  }
};

export {
  createWorkExperience,
  // updateWorkExperience,
  getWorkExperienceById,
  deleteWorkExperienceById,
};
