import api from "../lib/axios";

export async function getQuizzes() {
  const { data } = await api.get("/quizzes");
  return data;
}

export async function generateQuiz(noteId, count = 6) {
  const { data } = await api.post("/quizzes/generate", { noteId, count });
  return data;
}

export async function submitQuiz(id, answers) {
  const { data } = await api.post(`/quizzes/${id}/submit`, { answers });
  return data;
}

export async function deleteQuiz(id) {
  const { data } = await api.delete(`/quizzes/${id}`);
  return data;
}
