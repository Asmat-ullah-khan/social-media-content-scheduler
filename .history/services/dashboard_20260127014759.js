import Post from "../models/post.js";
import AppError from "../utils/appError.js";

export const getStatsService = async (userId) => {
  const [total, scheduled, published, failed, byPlatform] = await Promise.all([
    Post.countDocuments({ user: userId }), // Total
    Post.countDocuments({ user: userId, status: "scheduled" }),
    Post.countDocuments({ user: userId, status: "published" }),
    Post.countDocuments({ user: userId, status: "failed" }),
    // Aggregate by platform (all statuses)
    Post.aggregate([
      { $match: { user: userId } },
      { $unwind: "$platforms" },
      { $group: { _id: "$platforms", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
  ]);

  // Format byPlatform as object { Twitter: 2, ... }
  const platformCounts = byPlatform.reduce(
    (acc, p) => ({ ...acc, [p._id]: p.count }),
    {},
  );

  return {
    total,
    scheduled,
    published,
    failed,
    byPlatform: platformCounts,
  };
};

export const getUpcomingService = async (userId) => {
  const now = new Date();
  return await Post.find({
    user: userId,
    status: "scheduled",
    scheduleDate: { $gt: now }, // Future only
  })
    .sort({ scheduleDate: 1 }) // Soonest first
    .limit(5)
    .lean();
};
