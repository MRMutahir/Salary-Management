import { Year } from "../models/Year.model.js";

// Find a specific year based on the given payload
const findYearService = async (payload) => {
  try {
    const year = await Year.findOne(payload);
    return year;
  } catch (error) {
    throw new Error(`Error finding year: ${error.message}`);
  }
};

// Create a new year entry
const createYearService = async (payload) => {
  try {
    const year = await Year.create(payload);
    return year;
  } catch (error) {
    throw new Error(`Error creating year: ${error.message}`);
  }
};

// Get a year by ID and populate its month array
const getYearWithMonths = async (yearId) => {
  try {
    const year = await Year.findById(yearId).populate("monthArray").exec();
    return year;
  } catch (error) {
    throw new Error(`Error retrieving year with months: ${error.message}`);
  }
};

const findYearAndUpdateService = async (filter, payload) => {
  try {
    const year = await Year.findByIdAndUpdate(filter, payload, { new: true });
    return year;
  } catch (error) {
    throw new Error(`Error finding year: ${error.message}`);
  }
};

const findYearAndDeleteService = async (filter, payload) => {
  try {
    const year = await Year.findByIdAndUpdate(filter, payload, { new: true });
    return year;
  } catch (error) {
    throw new Error(`Error finding year: ${error.message}`);
  }
};

export {
  findYearService,
  createYearService,
  getYearWithMonths,
  findYearAndUpdateService,
  findYearAndDeleteService,
};
