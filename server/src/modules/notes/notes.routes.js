import { Router } from "express";

import upload from "../../config/multer.js";
import { protect } from "../../middleware/auth.middleware.js";

import {
  upload as uploadNote,
  getAll,
  getOne,
  update,
  remove,
} from "./notes.controller.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Notes Routes
|--------------------------------------------------------------------------
*/

// Upload a PDF
router.post(
  "/",
  protect,
  upload.single("file"),
  uploadNote
);

router.post(
  "/upload",
  protect,
  upload.single("file"),
  uploadNote
);

// Get all notes
router.get("/", protect, getAll);

// Get a single note
router.get("/:id", protect, getOne);

// Update note title
router.put("/:id", protect, update);

// Delete a note
router.delete("/:id", protect, remove);

export default router;
