import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [15, "Password must be at least 15 characters long"],
    },
    firstName: {
      type: String,
      // required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      // required: [true, "Last name is required"],
      trim: true,
    },
    displayName: {
      type: String,
      // required: [true, "Display name is required"],
      trim: true,
      unique: true,
    },
    age: {
      type: Number,
      min: [0, "Age cannot be negative"],
      // required: [true, "Age is required"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other", "Prefer not to say"],
      // required: [true, "Gender is required"],
    },
    profileImage: {
      type: String,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      // required: [true, "Date of birth is required"],
    },
    nicNumber: {
      type: String,
      // required: [true, "NIC number is required"],
      unique: true,
      trim: true,
    },
    relationshipStatus: {
      type: String,
      enum: ["Single", "Married", "Divorced", "Widowed", "In a relationship"],
      // required: [true, "Relationship status is required"],
    },
    country: {
      type: String,
      // required: [true, "Country is required"],
      trim: true,
    },
    city: {
      type: String,
      // required: [true, "City is required"],
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isEnabled: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Users = mongoose.model("Users", UsersSchema);

export { Users };
