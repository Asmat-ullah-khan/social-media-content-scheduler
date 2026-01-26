import AppError from "../utils/appError.js";
import {
  createPost,
  findPostsByUser,
  countPostsByUser,
  findPostByIdAndUser,
  updatePostByIdAndUser,
  deletePostByIdAndUser,
} from "../repository/post.js";

export const createPostService = async (data, userId) => {
  if (data.content?.length > 500)
    throw new AppError("Content too long (max 500 chars)", 400);
  if (data.scheduleDate && new Date(data.scheduleDate) <= new Date())
    throw new AppError("Schedule must be in the future", 400);

  data.status = data.scheduleDate ? "scheduled" : "draft";
  data.user = userId;

  return await createPost(data);
};

export const getPostsService = async (userId, page = 1, limit = 10, status) => {
  const query = status ? { status } : {};
  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    findPostsByUser(userId, query, { skip, limit }),
    countPostsByUser(userId, query),
  ]);

  return {
    posts,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    total,
  };
};

export const getPostService = async (id, userId) => {
  const post = await findPostByIdAndUser(id, userId);
  if (!post) throw new AppError("Post not found or access denied", 404);
  return post;
};

export const updatePostService = async (id, updateData, userId) => {
  const post = await findPostByIdAndUser(id, userId);
  if (!post) throw new AppError("Post not found or access denied", 404);

  if (post.status === "published")
    throw new AppError("Cannot edit published posts", 400);

  if (updateData.content?.length > 500)
    throw new AppError("Content too long (max 500 chars)", 400);
  if (
    updateData.scheduleDate &&
    new Date(updateData.scheduleDate) <= new Date()
  )
    throw new AppError("Schedule must be in the future", 400);

  if (updateData.scheduleDate) {
    updateData.status = "scheduled";
  }

  return await updatePostByIdAndUser(id, userId, updateData);
};

export const deletePostService = async (id, userId) => {
  const post = await deletePostByIdAndUser(id, userId);
  if (!post) throw new AppError("Post not found or access denied", 404);
  return post;
};
