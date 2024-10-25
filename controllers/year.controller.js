import { sendResponse } from "../helpers/common.js";
import {
  getYearWithMonths,
  createYearService,
  findYearService,
  findYearAndUpdateService,
} from "../services/year.service.js";

const createYearController = async (req, res) => {
  const currentUserID = req.user.id;

  try {
    const { YearName, description, isCurrent, monthArray, timeAndDate } =
      req.body;

    const existingYear = await findYearService({
      YearName,
      userID: currentUserID,
      isDelete: false,
    });

    if (existingYear) {
      return sendResponse(
        res,
        "This year bucket already exists. Please use the existing year or delete it before creating a new one.",
        false,
        409 // Conflict status code
      );
    }

    const payload = {
      YearName,
      description,
      isCurrent,
      monthArray,
      timeAndDate,
      userID: currentUserID,
    };

    const newYear = await createYearService(payload);
    if (!newYear) {
      return sendResponse(
        res,
        "Failed to create year bucket",
        false,
        500 // Internal Server Error status code
      );
    }

    return sendResponse(
      res,
      "Year bucket created successfully",
      true,
      201, // Created status code
      newYear
    );
  } catch (error) {
    console.error("Error in createYearController:", error);
    return sendResponse(
      res,
      "An error occurred while creating the year bucket",
      false,
      500, // Internal Server Error status code
      { error: error.message }
    );
  }
};

const editYearController = async (req, res) => {
  const { id } = req.params;
  const userID = req.user.id;

  try {
    const { YearName, description, isCurrent, monthArray, timeAndDate } =
      req.body;

    const existingYear = await findYearService({
      _id: id,
      userID,
      isDelete: false,
    });

    if (!existingYear) {
      return sendResponse(
        res,
        "Year bucket not found or has been deleted.",
        false,
        404 // Not Found status code
      );
    }

    const payload = {
      YearName,
      description,
      isCurrent,
      monthArray,
      timeAndDate,
    };

    const updatedYear = await findYearAndUpdateService(
      { _id: existingYear._id },
      payload
    );

    if (updatedYear) {
      return sendResponse(
        res,
        "Year bucket updated successfully",
        true,
        200, // OK status code
        updatedYear
      );
    } else {
      return sendResponse(
        res,
        "Failed to update year bucket",
        false,
        500 // Internal Server Error status code
      );
    }
  } catch (error) {
    console.error("Error in editYearController:", error);
    return sendResponse(
      res,
      "An error occurred while updating the year bucket",
      false,
      500, // Internal Server Error status code
      { error: error.message }
    );
  }
};

const deleteYearController = async (req, res) => {
  const { id } = req.params;
  const userID = req.user.id;

  try {
    const isExistingYear = await findYearService({
      _id: id,
      userID,
      isDelete: false,
    });

    if (!isExistingYear) {
      return sendResponse(
        res,
        "Year bucket not found or has been deleted.",
        false,
        404 // Not Found status code
      );
    }

    const deleteYearBucket = await findYearAndUpdateService(
      { _id: isExistingYear._id },
      { isDelete: true }
    );

    if (deleteYearBucket) {
      return sendResponse(
        res,
        "Year bucket deleted successfully",
        true,
        200 // OK status code
      );
    } else {
      return sendResponse(
        res,
        "Failed to delete year bucket",
        false,
        500 // Internal Server Error status code
      );
    }
  } catch (error) {
    console.error("Error in deleteYearController:", error);
    return sendResponse(
      res,
      "An error occurred while deleting the year bucket",
      false,
      500, // Internal Server Error status code
      { error: error.message }
    );
  }
};

export { createYearController, editYearController, deleteYearController };
