import mongoose from "mongoose";
import { MulterError } from "multer";
import { sendResponse } from "../helpers/common.js";

const errorHandler = async (err, req, res, next) => {
    if (err instanceof MulterError) {
        switch (err.code) {
            case "LIMIT_UNEXPECTED_FILE":
                return sendResponse(res, 'Unexpected file upload detected. Please check the uploaded files.', false, 400);
            default:
                return sendResponse(res, 'An error occurred while uploading files. Please try again.', false, 400);
        }
    } else if (err instanceof mongoose.Error.ValidationError) {
        return sendResponse(res, 'Data validation failed. Please review your input.', false, 422);
    } else {
        // An unknown error occurred
        console.error(err); // Replace with a logger in production
        return sendResponse(res, 'An unexpected error occurred. Please try again later.', false, 500);
    }
};

export { errorHandler };
