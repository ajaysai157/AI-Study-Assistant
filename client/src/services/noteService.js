import api from "../lib/axios";

export async function getNotes() {
  const { data } = await api.get("/notes");
  return data;
}

export async function getNote(id) {
  const { data } = await api.get("/notes/" + id);
  return data;
}

export async function uploadNote(formData) {
  const { data } = await api.post("/notes/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function updateNote(id, payload) {
  const { data } = await api.put("/notes/" + id, payload);
  return data;
}

export async function deleteNote(id) {
  const { data } = await api.delete("/notes/" + id);
  return data;
}
