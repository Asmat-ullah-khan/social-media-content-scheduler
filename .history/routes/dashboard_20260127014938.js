import express from "express";
import { protect } from "../middleware/auth.js";
import * as dashboardCtrl from "../controllers/dashboardController.js";

const router = express.Router();

router.use(protect); // JWT required

router.get("/stats", dashboardCtrl.getStats);
router.get("/upcoming", dashboardCtrl.getUpcoming);

export default router;
