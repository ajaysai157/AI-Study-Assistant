import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { config } from "../config/env.js";

export function protect(req, res, next) {
  try {
    if (!config.jwtSecret) {
      throw new ApiError(500, "Authentication is not configured.");
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Access denied. Please log in to continue.");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, config.jwtSecret);

    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.status).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
}
