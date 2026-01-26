import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import globalErrorHandler from "./middleware/errorHandler.js";
import AppError from "./utils/appError.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;
