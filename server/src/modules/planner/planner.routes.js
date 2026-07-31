import { Router } from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { create, getAll, remove, updateTask } from "./planner.controller.js";

const router = Router();

router.get("/", protect, getAll);
router.post("/", protect, create);
router.patch("/tasks/:taskId", protect, updateTask);
router.delete("/:id", protect, remove);

export default router;
