import { Users } from "../models/Users.js";

const registerUser = async (payload) => {
  try {
    const user = await Users.create(payload);
    return user;
  } catch (error) {
    throw Error(`Error creating user >> ${error}`);
  }
};

// const findUser = async (payload) => {
//   try {
//     const user = await Users.findOne(payload);
//     return user;
//   } catch (error) {
//     throw Error(`Error find user >> ${error}`);
//   }
// };

// const findUserAndUpdate = async (userId, updatePayload) => {
//   try {
//     const user = await Users.findByIdAndUpdate(userId, updatePayload, { new: true });
//     console.log(user);
//     return user;
//   } catch (error) {
//     console.error(`Error finding user >> ${error}`);
//     throw new Error(`Error finding user >> ${error}`);
//   }
// };


export { registerUser};
