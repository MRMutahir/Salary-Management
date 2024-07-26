import { Token } from "../models/Token.js";

const saveToken = async (payload) => {
  try {
    const token = await Token.create(payload);
    return token;
  } catch (error) {
    console.error(`Error creating token: ${error}`);
    throw Error(`Error creating token: ${error}`);
  }
};

const findToken = async (code) => {
  try {
    const token = await Token.findOne({ token: code });
    console.log("token", token);
    return token;
  } catch (error) {
    console.error(`Error finding token: ${error}`);
    throw Error(`Error finding token: ${error}`);
  }
};

const deleteToken = async (token) => {
  console.log("token", token);
  try {
    return await Token.deleteOne(token);
  } catch (error) {
    console.error(`Error finding token: ${error}`);
    throw Error(`Error finding token: ${error}`);
  }
};

export { saveToken, findToken, deleteToken };
