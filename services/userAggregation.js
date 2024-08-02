import { Users } from "../models/Users.js";
import { Education } from "../models/Education.js";
import { WorkExperience } from "../models/Work.js";
import mongoose from "mongoose";

const getUserData = async (userID, option, page, limit) => {
  console.log("userID", userID);
  console.log("option", option);
  console.log("page", page);
  console.log("limit", limit);

  try {
    // Assuming you have a MongoDB collection named "users"


    // Setting up the aggregation pipeline
    const pipeline = [
      {
        $match: { _id: userID }, // Match the user by ID
      },
      {
        $lookup: {
          from: "workexperiences", // The collection to join
          localField: "_id", // The field from the input documents
          foreignField: "userID", // The field from the documents of the "from" collection
          as: "workHistory", // The output array field
        },
      },
      {
        $lookup: {
          from: "educations", // The collection to join
          localField: "_id",
          foreignField: "userID",
          as: "education",
        },
      },
      {
        $facet: {
          userData: [{ $limit: 1 }],
          workHistory: [{ $skip: (page - 1) * limit }, { $limit: limit }],
          education: [{ $skip: (page - 1) * limit }, { $limit: limit }],
        },
      },
    ];

    // Executing the aggregation pipeline
    const results = await Users.aggregate(pipeline)
    console.log('results', results)

    // Returning the results
    return results;
  } catch (error) {
    throw new Error(`Error fetching user data: ${error.message}`);
  }
};

export { getUserData };
