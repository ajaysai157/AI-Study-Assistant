import { Router } from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { generate, getAll, remove, submit } from "./quizzes.controller.js";

const router = Router();

router.get("/", protect, getAll);
router.post("/generate", protect, generate);
router.post("/:id/submit", protect, submit);
router.delete("/:id", protect, remove);

export default router;
