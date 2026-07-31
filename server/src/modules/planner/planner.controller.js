import { createPlan, deletePlan, listPlans, toggleTask } from "./planner.service.js";

export async function getAll(req, res, next) {
  try {
    const data = await listPlans(req.user.userId);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function create(req, res, next) {
  try {
    const data = await createPlan(req.user.userId, req.body);
    res.status(201).json({ success: true, message: "Study plan created successfully.", data });
  } catch (error) {
    next(error);
  }
}

export async function updateTask(req, res, next) {
  try {
    const data = await toggleTask(req.user.userId, req.params.taskId, req.body.completed);
    res.status(200).json({ success: true, message: "Task updated successfully.", data });
  } catch (error) {
    next(error);
  }
}

export async function remove(req, res, next) {
  try {
    await deletePlan(req.user.userId, req.params.id);
    res.status(200).json({ success: true, message: "Study plan deleted successfully." });
  } catch (error) {
    next(error);
  }
}
