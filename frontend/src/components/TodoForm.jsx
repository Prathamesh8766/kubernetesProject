import { useEffect, useState } from "react";
import { Plus, Save, X } from "lucide-react";

const initialForm = {
  title: "",
  description: "",
  priority: "medium",
  dueDate: "",
};

function formatDateForInput(date) {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
}

function TodoForm({ editingTodo, onCancel, onSave }) {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editingTodo) {
      setForm({
        title: editingTodo.title || "",
        description: editingTodo.description || "",
        priority: editingTodo.priority || "medium",
        dueDate: formatDateForInput(editingTodo.dueDate),
      });
    } else {
      setForm(initialForm);
    }
  }, [editingTodo]);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    await onSave({
      ...form,
      dueDate: form.dueDate || undefined,
    });

    if (!editingTodo) {
      setForm(initialForm);
    }

    setSaving(false);
  };

  return (
    <section className="todo-form-panel">
      <h2>{editingTodo ? "Edit todo" : "Add todo"}</h2>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Finish Kubernetes notes"
            required
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Add details..."
            rows="4"
          />
        </label>

        <div className="form-grid">
          <label>
            Priority
            <select name="priority" value={form.priority} onChange={handleChange}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>

          <label>
            Due date
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form-actions">
          <button className="primary-btn" type="submit" disabled={saving}>
            {editingTodo ? <Save size={18} /> : <Plus size={18} />}
            {saving ? "Saving..." : editingTodo ? "Save" : "Add"}
          </button>

          {editingTodo && (
            <button className="secondary-btn" type="button" onClick={onCancel}>
              <X size={18} />
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default TodoForm;
