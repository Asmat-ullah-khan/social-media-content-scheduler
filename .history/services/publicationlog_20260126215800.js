import AppError from "../utils/appError.js";
import {
  findDuePosts,
  updatePostStatus,
  createPublicationLog,
  setPostFailed,
} from "../repository/publicationLog.js";

export const publishDuePosts = async () => {
  const now = new Date();
  try {
    const duePosts = await findDuePosts(now);
    if (duePosts.length === 0) {
      console.log(`No posts due at ${now}`);
      return { published: 0, failed: 0 };
    }

    let publishedCount = 0;
    let failedCount = 0;

    for (const post of duePosts) {
      try {
        await updatePostStatus(post._id, "published");
        await createPublicationLog(post._id);
        publishedCount++;
        console.log(`Published post ${post._id} at ${now}`);
      } catch (err) {
        await setPostFailed(post._id);
        failedCount++;
        console.error(`Failed post ${post._id}: ${err.message}`);
      }
    }

    console.log(
      `Scheduler run: ${publishedCount} published, ${failedCount} failed`,
    );
    return { published: publishedCount, failed: failedCount };
  } catch (err) {
    console.error("Scheduler error:", err);
    throw new AppError("Publishing job failed", 500);
  }
};
