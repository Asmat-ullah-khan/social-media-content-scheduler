// controllers/postController.js
import catchAsync from "../utils/catchAsync.js";
import * as postService from "../services/postService.js";

export const createPost = catchAsync(async (req, res, next) => {
  const result = await postService.createPostService(req.body, req.user.id);
  res.status(201).json({ status: "success", data: result });
});

export const getPosts = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 10, status } = req.query;
  const result = await postService.getPostsService(
    req.user.id,
    +page,
    +limit,
    status,
  );
  res.status(200).json({ status: "success", ...result });
});

export const getPost = catchAsync(async (req, res, next) => {
  const result = await postService.getPostService(req.params.id, req.user.id);
  res.status(200).json({ status: "success", data: result });
});

export const updatePost = catchAsync(async (req, res, next) => {
  const result = await postService.updatePostService(
    req.params.id,
    req.body,
    req.user.id,
  );
  res.status(200).json({ status: "success", data: result });
});

export const deletePost = catchAsync(async (req, res, next) => {
  await postService.deletePostService(req.params.id, req.user.id);
  res
    .status(204)
    .json({ status: "success", message: "Post deleted successfully" }); // 204 No Content
});
