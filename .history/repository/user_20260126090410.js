import User from "../models/user";
export const createUser = (data) => {
  return User.create(data);
};
export const findUserByEmail = (email) => {
  return User.findOne({ email }).select("+password");
};
