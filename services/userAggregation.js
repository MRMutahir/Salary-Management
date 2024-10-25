import { Users } from "../models/Users.js";
import { Education } from "../models/Education.js";
import { WorkExperience } from "../models/Work.js";
import mongoose from "mongoose";

const getUserData = async (userID, page = 1, limit = 10) => {
  try {
    const pipeline = [
      {
        $match: { _id: new mongoose.Types.ObjectId(userID) }, // Match the user by ID
      },
      {
        $project: {
          email: 1,
          isVerified: 1,
          age: 1,
          displayName: 1,
          nicNumber: 1,
          profileImage: 1,
          relationshipStatus: 1,
        },
      },
      {
        $skip: (page - 1) * limit, // Skip documents based on the current page
      },
      {
        $limit: limit, // Limit the number of documents returned
      },
    ];
    const results = await Users.aggregate(pipeline);
    return results[0] || null; // Return null if no results are found
  } catch (error) {
    throw new Error(`Error fetching user data: ${error.message}`);
  }
};

const getUserWorkData = async (userID, page = 1, limit = 10) => {
  try {
    const pipeline = [
      {
        $match: { userID: new mongoose.Types.ObjectId(userID) }, // Match the user by ID
      },
      {
        $project: {
          jobTitle: 1,
          company: 1,
          startDate: 1,
          currentlyWorking: 1,
          endDate: 1,
        },
      },
      {
        $skip: (page - 1) * limit, // Skip documents based on the current page
      },
      {
        $limit: limit, // Limit the number of documents returned
      },
    ];
    const results = await WorkExperience.aggregate(pipeline);
    return results;
  } catch (error) {
    throw new Error(`Error fetching user work data: ${error.message}`);
  }
};

const getUserEducationData = async (userID, page = 1, limit = 10) => {
  try {
    const pipeline = [
      {
        $match: { userID: new mongoose.Types.ObjectId(userID) }, // Match the user by ID
      },
      {
        $project: {
          degree: 1,
          institution: 1,
          startDate: 1,
          endDate: 1,
          fieldOfStudy: 1,
          currentlyStudying: 1,
        },
      },
      {
        $skip: (page - 1) * limit, // Skip documents based on the current page
      },
      {
        $limit: limit, // Limit the number of documents returned
      },
    ];
    const results = await Education.aggregate(pipeline);
    return results;
  } catch (error) {
    throw new Error(`Error fetching user education data: ${error.message}`);
  }
};

export { getUserData, getUserWorkData, getUserEducationData };
