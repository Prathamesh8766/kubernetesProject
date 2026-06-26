import TodoItem from "./TodoItem";

function TodoList({ loading, todos, onDelete, onEdit, onToggle }) {
  if (loading) {
    return <section className="todo-list empty-state">Loading todos...</section>;
  }

  if (!todos.length) {
    return (
      <section className="todo-list empty-state">
        <h2>No todos yet</h2>
        <p className="muted">Create your first todo from the form.</p>
      </section>
    );
  }

  return (
    <section className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggle={onToggle}
        />
      ))}
    </section>
  );
}

export default TodoList;
