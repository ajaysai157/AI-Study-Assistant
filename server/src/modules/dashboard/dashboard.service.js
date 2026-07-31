import prisma from "../../config/prisma.js";

function startOfToday() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

function endOfToday() {
  const date = startOfToday();
  date.setHours(23, 59, 59, 999);
  return date;
}

export async function getDashboard(userId) {
  const [notes, flashcards, quizzes, plans] = await Promise.all([
    prisma.note.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.flashcard.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.quizAttempt.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.studyPlan.findMany({
      where: { userId },
      include: { tasks: { orderBy: { date: "asc" } } },
      orderBy: { startDate: "asc" },
    }),
  ]);

  const tasks = plans.flatMap((plan) => plan.tasks.map((task) => ({ ...task, plan })));
  const today = startOfToday();
  const todayEnd = endOfToday();
  const completedTasks = tasks.filter((task) => task.completed).length;
  const todayTasks = tasks.filter((task) => task.date >= today && task.date <= todayEnd);
  const missedTasks = tasks.filter((task) => task.date < today && !task.completed);
  const upcomingTasks = tasks.filter((task) => task.date >= today && !task.completed).slice(0, 6);
  const completedQuizzes = quizzes.filter((quiz) => quiz.completed);
  const averageQuizScore =
    completedQuizzes.length === 0
      ? 0
      : Math.round(
          completedQuizzes.reduce((sum, quiz) => sum + (quiz.total ? (quiz.score / quiz.total) * 100 : 0), 0) /
            completedQuizzes.length
        );

  return {
    stats: {
      totalNotes: await prisma.note.count({ where: { userId } }),
      readyNotes: await prisma.note.count({ where: { userId, status: "READY" } }),
      totalFlashcards: await prisma.flashcard.count({ where: { userId } }),
      totalQuizzes: await prisma.quizAttempt.count({ where: { userId } }),
      completedTasks,
      totalTasks: tasks.length,
      planProgress: tasks.length ? Math.round((completedTasks / tasks.length) * 100) : 0,
      averageQuizScore,
      studyStreak: completedTasks > 0 ? 1 : 0,
    },
    recentNotes: notes,
    recentFlashcards: flashcards,
    recentQuizzes: quizzes,
    todayTasks,
    upcomingTasks,
    missedTasks,
  };
}
