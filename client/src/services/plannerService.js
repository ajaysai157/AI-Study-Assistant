import api from "../lib/axios";

export async function getPlans() {
  const { data } = await api.get("/planner");
  return data;
}

export async function createPlan(payload) {
  const { data } = await api.post("/planner", payload);
  return data;
}

export async function updateTask(taskId, completed) {
  const { data } = await api.patch(`/planner/tasks/${taskId}`, { completed });
  return data;
}

export async function deletePlan(id) {
  const { data } = await api.delete(`/planner/${id}`);
  return data;
}
