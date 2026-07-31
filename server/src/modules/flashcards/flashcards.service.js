import prisma from "../../config/prisma.js";
import { generateFlashcards as generateAiFlashcards } from "../ai/groq.service.js";
import { ApiError } from "../../utils/ApiError.js";

export async function listFlashcards(userId, search = "") {
  const where = {
    userId,
    ...(search
      ? {
          OR: [
            { question: { contains: search, mode: "insensitive" } },
            { answer: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  return prisma.flashcard.findMany({
    where,
    include: { note: { select: { id: true, title: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function createFlashcardsFromNote(userId, noteId, count = 10, replace = false) {
  const note = await prisma.note.findFirst({ where: { id: noteId, userId } });
  if (!note) throw new ApiError(404, "Note not found.");
  if (note.status !== "READY" || !note.extractedText) {
    throw new ApiError(400, "This note must finish processing before flashcards can be generated.");
  }

  const generated = await generateAiFlashcards(note.extractedText, count);
  if (generated.length === 0) throw new ApiError(502, "AI did not return usable flashcards.");

  return prisma.$transaction(async (tx) => {
    if (replace) {
      await tx.flashcard.deleteMany({ where: { userId, noteId } });
    }

    await tx.flashcard.createMany({
      data: generated.map((card) => ({
        ...card,
        source: note.title,
        userId,
        noteId,
      })),
    });

    return tx.flashcard.findMany({
      where: { userId, noteId },
      include: { note: { select: { id: true, title: true } } },
      orderBy: { createdAt: "desc" },
    });
  });
}

export async function deleteFlashcard(userId, id) {
  const existing = await prisma.flashcard.findFirst({ where: { id, userId } });
  if (!existing) throw new ApiError(404, "Flashcard not found.");
  await prisma.flashcard.delete({ where: { id } });
}
