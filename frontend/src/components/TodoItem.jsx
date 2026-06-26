import { Calendar, Check, Pencil, Trash2 } from "lucide-react";

function formatDate(date) {
  if (!date) return "No due date";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function TodoItem({ todo, onDelete, onEdit, onToggle }) {
  return (
    <article className={`todo-item ${todo.isCompleted ? "completed" : ""}`}>
      <button
        className="check-btn"
        type="button"
        onClick={() => onToggle(todo._id)}
        aria-label="Toggle todo"
      >
        {todo.isCompleted && <Check size={16} />}
      </button>

      <div className="todo-content">
        <div className="todo-title-row">
          <h3>{todo.title}</h3>
          <span className={`priority priority-${todo.priority}`}>
            {todo.priority}
          </span>
        </div>

        {todo.description && <p>{todo.description}</p>}

        <div className="todo-meta">
          <Calendar size={15} />
          <span>{formatDate(todo.dueDate)}</span>
        </div>
      </div>

      <div className="todo-actions">
        <button className="icon-btn" type="button" onClick={() => onEdit(todo)}>
          <Pencil size={17} />
          <span>Edit</span>
        </button>
        <button
          className="danger-btn"
          type="button"
          onClick={() => onDelete(todo._id)}
        >
          <Trash2 size={17} />
          <span>Delete</span>
        </button>
      </div>
    </article>
  );
}

export default TodoItem;
