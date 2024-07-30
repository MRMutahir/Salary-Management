import mongoose from "mongoose";

const workHistorySchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "User ID is required"],
    },
    jobTitle: {
      type: String,
      required: true,
      trim: true, // Removes whitespace from ends
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    description: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    currentlyWorking: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const WorkHistory = mongoose.model("WorkHistory", workHistorySchema);
export { WorkHistory };
