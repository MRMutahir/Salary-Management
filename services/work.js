import { WorkExperience } from "../models/Work.js";

const newWorkExperience = async (payload) => {
  try {
    const experience = await WorkExperience.create(payload);
    return experience;
  } catch (error) {
    throw new Error(`Error creating Work Experience: ${error.message}`);
  }
};

const workExperienceFind = async (payload) => {
  try {
    const experience = await WorkExperience.findOne(payload);
    return experience;
  } catch (error) {
    throw new Error(`Error finding Work Experience: ${error.message}`);
  }
};

const workExperienceFindByIDAndUpdate = async (filter, payload) => {
  try {
    const experience = await WorkExperience.findOneAndUpdate(filter, payload, {
      new: true,
    });
    return experience;
  } catch (error) {
    throw new Error(`Error updating Work Experience: ${error.message}`);
  }
};

export {
  newWorkExperience,
  workExperienceFind,
  workExperienceFindByIDAndUpdate,
};
