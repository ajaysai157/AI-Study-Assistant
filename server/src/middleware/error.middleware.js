import { ApiError } from "../utils/ApiError.js";
import { config } from "../config/env.js";

export function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      success: false,
      message: err.message,
    });
  }

  if (err.name === "MulterError") {
    const message =
      err.code === "LIMIT_FILE_SIZE"
        ? "File size must be 10MB or less."
        : "Invalid file upload.";

    return res.status(400).json({
      success: false,
      message,
    });
  }

  if (err.code && err.code.startsWith("P")) {
    console.error("Prisma Database Error:", err);
    return res.status(400).json({
      success: false,
      message: "A database error occurred. Please check your inputs.",
    });
  }

  console.error("Unhandled Error Case:", err);
  return res.status(500).json({
    success: false,
    message:
      config.nodeEnv === "development"
        ? err.message || "Internal server error."
        : "Internal server error.",
  });
}
