import { Users } from "../models/Users.js";

const registerUser = async (payload) => {
  try {
    const user = await Users.create(payload);
    return user;
  } catch (error) {
    throw Error(`Error creating user >> ${error}`);
  }
};

const findUser = async (payload) => {
  try {
    const user = await Users.findOne(payload);
    return user;
  } catch (error) {
    throw Error(`Error find user >> ${error}`);
  }
};

export { registerUser, findUser };
