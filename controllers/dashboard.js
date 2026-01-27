import catchAsync from "../utils/catchAsync.js";
import * as dashboardService from "../services/dashboard.js";

export const getStats = catchAsync(async (req, res, next) => {
  const data = await dashboardService.getStatsService(req.user.id);
  res.status(200).json({ status: "success", data });
});

export const getUpcoming = catchAsync(async (req, res, next) => {
  const data = await dashboardService.getUpcomingService(req.user.id);
  res.status(200).json({ status: "success", data });
});
