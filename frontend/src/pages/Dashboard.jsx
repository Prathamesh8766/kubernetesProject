import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import api from "../api/axios";

function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const stats = useMemo(() => {
    const completed = todos.filter((todo) => todo.isCompleted).length;
    return {
      total: todos.length,
      completed,
      pending: todos.length - completed,
    };
  }, [todos]);

  const fetchTodos = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await api.get("/todos");
      setTodos(response.data.todos || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSave = async (todoData) => {
    setError("");

    try {
      if (editingTodo) {
        const response = await api.put(`/todos/${editingTodo._id}`, todoData);
        setTodos((currentTodos) =>
          currentTodos.map((todo) =>
            todo._id === editingTodo._id ? response.data.todo : todo
          )
        );
        setEditingTodo(null);
        return;
      }

      const response = await api.post("/todos", todoData);
      setTodos((currentTodos) => [response.data.todo, ...currentTodos]);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save todo");
    }
  };

  const handleToggle = async (todoId) => {
    setError("");

    try {
      const response = await api.patch(`/todos/${todoId}/toggle`);
      setTodos((currentTodos) =>
        currentTodos.map((todo) =>
          todo._id === todoId ? response.data.todo : todo
        )
      );
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update todo");
    }
  };

  const handleDelete = async (todoId) => {
    setError("");

    try {
      await api.delete(`/todos/${todoId}`);
      setTodos((currentTodos) =>
        currentTodos.filter((todo) => todo._id !== todoId)
      );
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete todo");
    }
  };

  return (
    <main className="app-shell">
      <Navbar />

      <section className="dashboard">
        <div className="dashboard-header">
          <div>
            <h1>My Todos</h1>
            <p className="muted">Plan, finish, repeat.</p>
          </div>

          <div className="stats">
            <span>{stats.total} total</span>
            <span>{stats.pending} pending</span>
            <span>{stats.completed} done</span>
          </div>
        </div>

        {error && <div className="alert">{error}</div>}

        <div className="workspace">
          <TodoForm
            editingTodo={editingTodo}
            onCancel={() => setEditingTodo(null)}
            onSave={handleSave}
          />

          <TodoList
            loading={loading}
            todos={todos}
            onDelete={handleDelete}
            onEdit={setEditingTodo}
            onToggle={handleToggle}
          />
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
