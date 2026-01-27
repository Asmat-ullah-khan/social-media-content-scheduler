import Post from "../models/post.js";
import PublicationLog from "../models/publicationLog.js";

export const findDuePosts = (now) => {
  return Post.find({
    status: "scheduled",
    scheduleDate: { $lte: now },
  })
    .sort({ scheduleDate: 1, createdAt: 1 })
    .lean();
};

export const updatePostStatus = (postId, status) => {
  return Post.findByIdAndUpdate(
    postId,
    { status },
    { new: true, runValidators: true },
  );
};

export const createPublicationLog = (postId) => {
  return PublicationLog.create({ post: postId });
};

export const setPostFailed = (postId) => {
  return Post.findByIdAndUpdate(postId, { status: "failed" });
};
