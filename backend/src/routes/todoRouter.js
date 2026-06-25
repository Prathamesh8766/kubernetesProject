import express from "express";

import {
  createTodo,
  getTodos,
  getSingleTodo,
  updateTodo,
  deleteTodo,
  toggleTodoStatus,
} from "../controller/todoController.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

// Create todo and get all todos
// POST /api/todos
// GET  /api/todos
router.route("/")
  .post(protect, createTodo)
  .get(protect, getTodos);

// Get, update, delete single todo
// GET    /api/todos/:id
// PUT    /api/todos/:id
// DELETE /api/todos/:id
router.route("/:id")
  .get(protect, getSingleTodo)
  .put(protect, updateTodo)
  .delete(protect, deleteTodo);

// Toggle todo completed/incomplete
// PATCH /api/todos/:id/toggle
router.patch("/:id/toggle", protect, toggleTodoStatus);

export default router;