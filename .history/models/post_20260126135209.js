import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true, maxlength: 500 },
    platforms: [{ type: String, enum: ["Twitter", "Facebook", "Instagram"] }], // Array for multi-select
    scheduleDate: { type: Date, required: true },
    imageUrl: { type: String }, // Optional
    status: {
      type: String,
      enum: ["draft", "scheduled", "published", "failed"],
      default: "draft",
    },
  },
  { timestamps: true },
);

// Indexes for perf
postSchema.index({ user: 1, status: 1 }); // Quick user + status filters
postSchema.index({ scheduleDate: 1 }); // For scheduling scans

export default mongoose.model("Post", postSchema);
