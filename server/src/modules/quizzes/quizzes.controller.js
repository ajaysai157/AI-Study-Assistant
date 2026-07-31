import { ApiError } from "../../utils/ApiError.js";
import { createQuizFromNote, deleteQuiz, listAttempts, submitQuiz } from "./quizzes.service.js";

export async function getAll(req, res, next) {
  try {
    const data = await listAttempts(req.user.userId);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function generate(req, res, next) {
  try {
    const { noteId, count = 6 } = req.body;
    if (!noteId) throw new ApiError(400, "Note is required.");
    const safeCount = Math.min(Math.max(Number(count) || 6, 3), 12);
    const data = await createQuizFromNote(req.user.userId, noteId, safeCount);
    res.status(201).json({ success: true, message: "Quiz generated successfully.", data });
  } catch (error) {
    next(error);
  }
}

export async function submit(req, res, next) {
  try {
    const data = await submitQuiz(req.user.userId, req.params.id, req.body.answers || {});
    res.status(200).json({ success: true, message: "Quiz submitted successfully.", data });
  } catch (error) {
    next(error);
  }
}

export async function remove(req, res, next) {
  try {
    await deleteQuiz(req.user.userId, req.params.id);
    res.status(200).json({ success: true, message: "Quiz deleted successfully." });
  } catch (error) {
    next(error);
  }
}
