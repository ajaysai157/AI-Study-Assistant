import api from "../lib/axios";

export async function getFlashcards(search = "") {
  const { data } = await api.get(`/flashcards${search ? `?search=${encodeURIComponent(search)}` : ""}`);
  return data;
}

export async function generateFlashcards(noteId, count = 10, replace = false) {
  const { data } = await api.post("/flashcards/generate", { noteId, count, replace });
  return data;
}

export async function deleteFlashcard(id) {
  const { data } = await api.delete(`/flashcards/${id}`);
  return data;
}
