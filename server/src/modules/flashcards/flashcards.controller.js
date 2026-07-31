import { ApiError } from "../../utils/ApiError.js";
import { createFlashcardsFromNote, deleteFlashcard, listFlashcards } from "./flashcards.service.js";

export async function getAll(req, res, next) {
  try {
    const search = typeof req.query.search === "string" ? req.query.search.trim() : "";
    const data = await listFlashcards(req.user.userId, search);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function generate(req, res, next) {
  try {
    const { noteId, count = 10, replace = false } = req.body;
    if (!noteId) throw new ApiError(400, "Note is required.");
    const safeCount = Math.min(Math.max(Number(count) || 10, 4), 20);
    const data = await createFlashcardsFromNote(req.user.userId, noteId, safeCount, Boolean(replace));
    res.status(201).json({ success: true, message: "Flashcards generated successfully.", data });
  } catch (error) {
    next(error);
  }
}

export async function remove(req, res, next) {
  try {
    await deleteFlashcard(req.user.userId, req.params.id);
    res.status(200).json({ success: true, message: "Flashcard deleted successfully." });
  } catch (error) {
    next(error);
  }
}
