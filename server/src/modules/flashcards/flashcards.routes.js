import { Router } from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { generate, getAll, remove } from "./flashcards.controller.js";

const router = Router();

router.get("/", protect, getAll);
router.post("/generate", protect, generate);
router.delete("/:id", protect, remove);

export default router;
