import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import publishDuePosts from "./services/publicationlog.js";

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config();

// Connect to database
connectDB();

ron.schedule(
  "* * * * *",
  async () => {
    try {
      await publishDuePosts();
    } catch (err) {
      console.error("Cron execution failed:", err);
    }
  },
  {
    scheduled: true,
    timezone: "UTC",
  },
);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
