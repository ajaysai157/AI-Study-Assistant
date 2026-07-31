import prisma from "../../config/prisma.js";
import { ApiError } from "../../utils/ApiError.js";

function daysBetween(startDate, endDate) {
  const days = [];
  const current = new Date(startDate);
  const end = new Date(endDate);
  current.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  while (current <= end) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return days;
}

export async function listPlans(userId) {
  return prisma.studyPlan.findMany({
    where: { userId },
    include: { tasks: { orderBy: { date: "asc" } } },
    orderBy: { startDate: "asc" },
  });
}

export async function createPlan(userId, data) {
  const subject = data.subject?.trim();
  const targetExam = data.targetExam?.trim();
  const availableHours = Number(data.availableHours);
  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);

  if (!subject || !targetExam) throw new ApiError(400, "Subject and target exam are required.");
  if (!Number.isInteger(availableHours) || availableHours < 1 || availableHours > 12) {
    throw new ApiError(400, "Available hours must be between 1 and 12.");
  }
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime()) || startDate > endDate) {
    throw new ApiError(400, "Please provide a valid date range.");
  }

  const days = daysBetween(startDate, endDate);
  const taskTemplates = ["Review concepts", "Practice problems", "Summarize weak areas", "Timed revision"];
  const duration = Math.max(30, Math.floor((availableHours * 60) / 2));
  const tasks = days.flatMap((date, dayIndex) => [
    {
      title: `${subject}: ${taskTemplates[dayIndex % taskTemplates.length]}`,
      description: `Prepare for ${targetExam} with a focused ${Math.round(duration / 60)} hour block.`,
      date,
      duration,
    },
    {
      title: `${subject}: Active recall`,
      description: "Use notes, flashcards, or quiz results to test retention.",
      date,
      duration,
    },
  ]);

  return prisma.studyPlan.create({
    data: {
      subject,
      targetExam,
      availableHours,
      startDate,
      endDate,
      userId,
      tasks: { create: tasks },
    },
    include: { tasks: { orderBy: { date: "asc" } } },
  });
}

export async function toggleTask(userId, taskId, completed) {
  const task = await prisma.studyTask.findFirst({
    where: { id: taskId, studyPlan: { userId } },
  });
  if (!task) throw new ApiError(404, "Task not found.");

  return prisma.studyTask.update({
    where: { id: taskId },
    data: { completed: Boolean(completed), completedAt: completed ? new Date() : null },
  });
}

export async function deletePlan(userId, id) {
  const existing = await prisma.studyPlan.findFirst({ where: { id, userId } });
  if (!existing) throw new ApiError(404, "Study plan not found.");
  await prisma.studyPlan.delete({ where: { id } });
}
