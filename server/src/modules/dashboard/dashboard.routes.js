import { Router } from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { getOverview } from "./dashboard.controller.js";

const router = Router();

router.get("/", protect, getOverview);

export default router;
