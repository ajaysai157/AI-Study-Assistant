import prisma from "../../config/prisma.js";
import { generateQuizQuestions } from "../ai/groq.service.js";
import { ApiError } from "../../utils/ApiError.js";

export async function listAttempts(userId) {
  return prisma.quizAttempt.findMany({
    where: { userId },
    include: { note: { select: { id: true, title: true } }, questions: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function createQuizFromNote(userId, noteId, count = 6) {
  const note = await prisma.note.findFirst({ where: { id: noteId, userId } });
  if (!note) throw new ApiError(404, "Note not found.");
  if (note.status !== "READY" || !note.extractedText) {
    throw new ApiError(400, "This note must finish processing before a quiz can be generated.");
  }

  const questions = await generateQuizQuestions(note.extractedText, count);
  if (questions.length === 0) throw new ApiError(502, "AI did not return usable quiz questions.");

  return prisma.quizAttempt.create({
    data: {
      title: `${note.title} Quiz`,
      total: questions.length,
      userId,
      noteId,
      questions: { create: questions },
    },
    include: { note: { select: { id: true, title: true } }, questions: true },
  });
}

export async function submitQuiz(userId, id, answers = {}) {
  const attempt = await prisma.quizAttempt.findFirst({
    where: { id, userId },
    include: { questions: true },
  });
  if (!attempt) throw new ApiError(404, "Quiz not found.");

  let score = 0;
  const updates = attempt.questions.map((question) => {
    const userAnswer = answers[question.id] || "";
    const isCorrect = userAnswer === question.correctAnswer;
    if (isCorrect) score += 1;
    return prisma.quizQuestion.update({
      where: { id: question.id },
      data: { userAnswer, isCorrect },
    });
  });

  await prisma.$transaction(updates);

  return prisma.quizAttempt.update({
    where: { id },
    data: { score, total: attempt.questions.length, completed: true },
    include: { note: { select: { id: true, title: true } }, questions: true },
  });
}

export async function deleteQuiz(userId, id) {
  const existing = await prisma.quizAttempt.findFirst({ where: { id, userId } });
  if (!existing) throw new ApiError(404, "Quiz not found.");
  await prisma.quizAttempt.delete({ where: { id } });
}
