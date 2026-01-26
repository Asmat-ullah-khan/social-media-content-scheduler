import User from "../models/user";
export const createUser = (data) => {
  return User.create(data);
};
