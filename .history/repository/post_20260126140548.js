import Post from "../models/post.js";

export const createPost = (data) => {
  return Post.create(data);
};

export const findPostsByUser = (userId, query = {}, options = {}) => {
  return Post.find({ ...query, user: userId })
    .sort({ createdAt: -1 })
    .skip(options.skip || 0)
    .limit(options.limit || 10)
    .lean()
    .exec();
};

export const countPostsByUser = (userId, query = {}) => {
  return Post.countDocuments({ ...query, user: userId });
};

export const findPostByIdAndUser = (id, userId) => {
  return Post.findOne({ _id: id, user: userId }).lean();
};

export const updatePostByIdAndUser = (id, userId, updateData) => {
  return Post.findOneAndUpdate({ _id: id, user: userId }, updateData, {
    new: true,
    runValidators: true,
  }).lean();
};

export const deletePostByIdAndUser = (id, userId) => {
  return Post.findOneAndDelete({ _id: id, user: userId });
};
