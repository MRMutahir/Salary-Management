import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "User ID is required"],
    },
    degree: {
      type: String,
      required: true,
      trim: true,
    },
    institution: {
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
    fieldOfStudy: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    currentlyStudying: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Education = mongoose.model("Education", educationSchema);
export default Education;
