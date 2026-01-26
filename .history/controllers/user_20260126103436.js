import * as authService from "../services/authService.js";
import { catchAsync } from "../utils/catchAsync.js";

export const register = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const result = await authService.registerUser(email, password);
  res.status(201).json({ status: "success", data: result });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const result = await authService.loginUser(email, password);
  res.status(200).json({ status: "success", data: result });
});
