import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./modules/auth/auth.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
// Health Check Route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "StudyFlow API is running 🚀",
  });
});


export default app;