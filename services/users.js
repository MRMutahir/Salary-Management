import { Users } from "../models/Users.js";

const findUserAndUpdate = async (userId, updatePayload) => {
  try {
    const user = await Users.findByIdAndUpdate(userId, updatePayload, { new: true });
    return user;
  } catch (error) {
    console.error(`Error updating user: ${error.message}`);
    throw new Error(`Error updating user: ${error.message}`);
  }
};


const findUser = async (payload) => {
  try {
    const user = await Users.findOne(payload);
    return user;
  } catch (error) {
    console.error(`Error finding user: ${error.message}`);
    throw new Error(`Error finding user: ${error.message}`);
  }
};

const findAllUser = async (query, projection) => {
  try {
    const users = await Users.find(query, projection);
    return users;
  } catch (error) {
    console.error(`Error finding users: ${error.message}`);
    throw new Error(`Error finding users: ${error.message}`);
  }
};


export { findUserAndUpdate, findUser, findAllUser };
