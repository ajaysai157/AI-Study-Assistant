import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import authRoutes from "./modules/auth/auth.routes.js";
import notesRoutes from "./modules/notes/notes.routes.js";
import dashboardRoutes from "./modules/dashboard/dashboard.routes.js";
import flashcardsRoutes from "./modules/flashcards/flashcards.routes.js";
import quizzesRoutes from "./modules/quizzes/quizzes.routes.js";
import plannerRoutes from "./modules/planner/planner.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { config } from "./config/env.js";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: config.clientOrigin === "*" ? true : config.clientOrigin,
    credentials: true,
  })
);
app.use(express.json({ limit: config.maxJsonSize }));
app.use(express.urlencoded({ extended: true, limit: config.maxJsonSize }));
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "StudyFlow API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/flashcards", flashcardsRoutes);
app.use("/api/quizzes", quizzesRoutes);
app.use("/api/planner", plannerRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

app.use(errorHandler);

export default app;
