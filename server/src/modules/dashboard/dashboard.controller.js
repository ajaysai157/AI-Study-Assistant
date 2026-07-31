import { getDashboard } from "./dashboard.service.js";

export async function getOverview(req, res, next) {
  try {
    const data = await getDashboard(req.user.userId);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
