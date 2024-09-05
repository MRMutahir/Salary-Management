import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

// Define the schema
const yearSchema = new Schema({
  YearName: {
    type: String,
    required: [true, "Year name is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"], // Custom required message
    maxlength: [50, "Description cannot exceed 50 characters"], // Max length validation
  },
  timeAndDate: {
    type: Date,
    default: Date.now,
  },
  isCurrent: {
    type: Boolean,
    default: false,
  },
  monthArray: [
    {
      type: Types.ObjectId, // Array of ObjectIds
      ref: "Month", // Reference to the Month model
    },
  ],
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: [true, "User ID is required"],
    immutable: true, // This makes the field immutable
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
});

// Create the model
const Year = model("Year", yearSchema);

export { Year };
