
import User from "../models/User.js";
import Todo from "../models/todoModel.js";


export const createTodo = async (req, res) => {
    try {
        const { title, description, priority, dueDate } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Todo title is required",
            });
        }

        const todo = await Todo.create({
            title,
            description,
            priority,
            dueDate,
            user: req.user._id,
        });

        res.status(201).json({
            message: "Todo created successfully",
            todo,
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong while creating todo",
            error: error.message,
        });
    }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      count: todos.length,
      todos,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while fetching todos",
      error: error.message,
    });
  }
};

export const getSingleTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json({
      todo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while fetching todo",
      error: error.message,
    });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    todo.title = req.body.title || todo.title;
    todo.description =
      req.body.description !== undefined
        ? req.body.description
        : todo.description;
    todo.priority = req.body.priority || todo.priority;
    todo.dueDate = req.body.dueDate || todo.dueDate;

    if (req.body.isCompleted !== undefined) {
      todo.isCompleted = req.body.isCompleted;
    }

    const updatedTodo = await todo.save();

    res.status(200).json({
      message: "Todo updated successfully",
      todo: updatedTodo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while updating todo",
      error: error.message,
    });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    await todo.deleteOne();

    res.status(200).json({
      message: "Todo deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while deleting todo",
      error: error.message,
    });
  }
};

export const toggleTodoStatus = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    todo.isCompleted = !todo.isCompleted;

    const updatedTodo = await todo.save();

    res.status(200).json({
      message: "Todo status updated successfully",
      todo: updatedTodo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while updating todo status",
      error: error.message,
    });
  }
};