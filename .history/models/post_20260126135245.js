import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true, maxlength: 500 },
    platforms: [{ type: String, enum: ["Twitter", "Facebook", "Instagram"] }],
    scheduleDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["draft", "scheduled", "published", "failed"],
      default: "draft",
    },
  },
  { timestamps: true },
);

postSchema.index({ user: 1, status: 1 });
postSchema.index({ scheduleDate: 1 });

export default mongoose.model("Post", postSchema);
