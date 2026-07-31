import api from "../lib/axios";

export async function updateProfile(payload) {
  const { data } = await api.put("/auth/me", payload);
  return data;
}
