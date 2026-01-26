import { createUser, findUserByEmail } from "../repository/user.js";
import { generateToken } from "../utils/jwt.js";
import AppError from "../utils/appError.js";

export const registerUser = async (email, password) => {
  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }
  const existingUser = await findUserByEmail(email);
  if (existingUser) throw new AppError("Email already exists", 400);

  const newUser = await createUser({ email, password });
  newUser.password = undefined;
  const token = generateToken(newUser._id);

  return { user: newUser, token };
};

export const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }
  const user = await findUserByEmail(email);
  if (!user) throw new AppError("Invalid email or password", 401);

  const isCorrect = await user.correctPassword(password, user.password);
  if (!isCorrect) throw new AppError("Invalid email or password", 401);
  user.password = undefined;
  const token = generateToken(user._id);
  return { user, token };
};
