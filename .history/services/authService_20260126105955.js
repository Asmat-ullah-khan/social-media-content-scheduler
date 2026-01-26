// services/authService.js
import { createUser, findUserByEmail } from "../repository/user.js";
import { generateToken } from "../utils/jwt.js";

export const registerUser = async (email, password) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) throw new Error("Email already exists");

  const newUser = await createUser({ email, password });
  const token = generateToken(newUser._id);

  return { user: newUser, token };
};

export const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("Invalid email or password");

  const isCorrect = await user.correctPassword(password, user.password);
  if (!isCorrect) throw new Error("Invalid email or password");

  const token = generateToken(user._id);
  return { user, token };
};
