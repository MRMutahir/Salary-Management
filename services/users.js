import { Users } from "../models/Users.js";

const findUserAndUpdate = async (userId, updatePayload) => {
  try {
    const user = await Users.findByIdAndUpdate(userId, updatePayload, {
      new: true,
    });
    return user;
  } catch (error) {
    console.error(`Error finding user >> ${error}`);
    throw new Error(`Error finding user >> ${error}`);
  }
};

const findUser = async (payload) => {
  console.log("payload", payload);
  try {
    const user = await Users.findOne(payload);
    return user;
  } catch (error) {
    throw Error(`Error find user >> ${error}`);
  }
};

const findAllUser = async (query, option) => {
  try {
    const user = await Users.find(query, option);
    return user;
  } catch (error) {
    throw Error(`Error find user >> ${error}`);
  }
};

export { findUserAndUpdate, findUser, findAllUser };
