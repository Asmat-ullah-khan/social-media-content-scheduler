// HANDLE UNCAUGHT EXCEPTIONS (SYNC ERRORS)
process.on("uncaughtException", (err) => {
  console.log("❌ UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const connectDB = require("./config/db");

// CONNECT DATABASE
connectDB();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// HANDLE UNHANDLED PROMISE REJECTIONS (ASYNC ERRORS)
process.on("unhandledRejection", (err) => {
  console.log("❌ UNHANDLED REJECTION! Shutting down...");
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
