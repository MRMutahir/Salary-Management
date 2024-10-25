import { Education } from "../models/Education.js";

const newEducation = async (payload) => {
  try {
    const education = await Education.create(payload);
    return education;
  } catch (error) {
    throw new Error(`Error creating Education: ${error.message}`);
  }
};

const educationFind = async (payload) => {
    console.log('payload', payload)
  try {
    const education = await Education.findOne(payload);
    return education;
  } catch (error) {
    throw new Error(`Error finding Education: ${error.message}`);
  }
};

const educationFindByIDAndUpdate = async (filter, payload) => {
  try {
    const education = await Education.findOneAndUpdate(filter, payload, {
      new: true,
    });
    return education;
  } catch (error) {
    throw new Error(`Error updating Education: ${error.message}`);
  }
};

export {
  newEducation,
  educationFind,
  educationFindByIDAndUpdate,
};
