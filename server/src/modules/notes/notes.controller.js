import fs from "fs/promises";
import path from "path";
import { extractPdfText } from "../../utils/pdf.js";
import { generateSummary } from "../ai/groq.service.js";
import { ApiError } from "../../utils/ApiError.js";
import { uploadPath } from "../../config/multer.js";

import {
  uploadNote,
  getAllNotes,
  getNoteById,
  updateNoteTitle,
  deleteNote,
  updateExtractedText,
} from "./notes.service.js";

export async function upload(req, res, next) {
  try {
    if (!req.file) {
      throw new ApiError(400, "Please upload a PDF file.");
    }

    const title = req.body.title || path.parse(req.file.originalname).name;

    if (!title || !title.trim()) {
      throw new ApiError(400, "Title is required.");
    }

    const note = await uploadNote({
      title: title.trim(),
      originalFileName: req.file.originalname,
      storedFileName: req.file.filename,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      status: "PROCESSING",
      userId: req.user.userId,
    });

    let updatedNote = note;

    try {
      const { text, pages } = await extractPdfText(req.file.path);
      const summary = await generateSummary(text);

      updatedNote = await updateExtractedText(
        note.id,
        text,
        pages,
        "READY",
        summary
      );
    } catch (error) {
      console.error("AI Processing Error:", error);
      updatedNote = await updateExtractedText(
        note.id,
        "",
        0,
        "FAILED",
        null
      );
    }

    res.status(201).json({
      success: true,
      message:
        updatedNote.status === "READY"
          ? "Note uploaded and processed successfully."
          : "Note uploaded, but processing failed.",
      data: updatedNote,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAll(req, res, next) {
  try {
    const search = typeof req.query.search === "string" ? req.query.search.trim() : "";
    const notes = await getAllNotes(req.user.userId, search);

    res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (error) {
    next(error);
  }
}

export async function getOne(req, res, next) {
  try {
    const note = await getNoteById(req.params.id, req.user.userId);

    if (!note) {
      throw new ApiError(404, "Note not found.");
    }

    res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    next(error);
  }
}

export async function update(req, res, next) {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      throw new ApiError(400, "Title is required.");
    }

    const note = await getNoteById(req.params.id, req.user.userId);

    if (!note) {
      throw new ApiError(404, "Note not found.");
    }

    const updatedNote = await updateNoteTitle(note.id, title.trim());

    res.status(200).json({
      success: true,
      message: "Note updated successfully.",
      data: updatedNote,
    });
  } catch (error) {
    next(error);
  }
}

export async function remove(req, res, next) {
  try {
    const note = await getNoteById(req.params.id, req.user.userId);

    if (!note) {
      throw new ApiError(404, "Note not found.");
    }

    const filePath = path.join(uploadPath, note.storedFileName);

    try {
      await fs.unlink(filePath);
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }

    await deleteNote(note.id);

    res.status(200).json({
      success: true,
      message: "Note deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
}
