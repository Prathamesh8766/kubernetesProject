import express from "express";
import cors from "cors";

import authRouter from "./routes/authRouter.js";
import todoRouter from "./routes/todoRouter.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Todo API is running...");
});

// Health route for Docker/Kubernetes
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});

// Main routes
app.use("/api/auth", authRouter);
app.use("/api/todos", todoRouter);

export default app;