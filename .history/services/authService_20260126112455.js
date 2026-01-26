import { createUser, findUserByEmail } from "../repository/user.js";
import { generateToken } from "../utils/jwt.js";
import AppError from "../utils/appError.js";

export const registerUser = async (email, password) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) throw new AppError("Email already exists", 400);

  const newUser = await createUser({ email, password });
  const token = generateToken(newUser._id);

  return { user: newUser, token };
};

export const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) throw new AppError("Invalid email or password", 401);

  const isCorrect = await user.correctPassword(password, user.password);
  if (!isCorrect) throw new AppError("Invalid email or password", 401);

  const token = generateToken(user._id);
  return { user, token };
};
