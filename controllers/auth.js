import { registerUser, findUser } from "../services/auth.js";

const register = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    res.send("email is required");
  }
  if (!password) {
    res.send("password is required");
  }

  try {
    const existingUser = await findUser({ email });
    if (existingUser) {
       // 409 Conflict is more appropriate for this scenario
      return res.status(409).send("Please choose another email address because this email is already in use.");}
    const user = await registerUser({ email, password });
    if (user) {
      return res.status(201).send("User created successfully");
    }
  } catch (error) {
    next(error);
  }
};

export { register };
