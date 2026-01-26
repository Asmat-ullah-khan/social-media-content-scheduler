const express = require("express");
const cors = require("cors");
const globalErrorHandler = require("./middleware/errorHandler");
import authRoutes from ("./routes/authRoutes");
const AppError = require("./utils/appError");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.all(/.*/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
