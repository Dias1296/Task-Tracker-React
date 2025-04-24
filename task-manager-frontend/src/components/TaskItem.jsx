function TaskItem({ task, setTasks }) {
  const handleDelete = async () => {
    const res = await fetch(`https://localhost:7236/api/task/${task.id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      //Remove deleted task from list
      setTasks((prev) => prev.filter((t) => t.id !== task.id));
    }
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <strong>{task.title}</strong>
      <p>{task.description}</p>
      <p>Status: {task.isCompleted ? '✅ Done' : '🕒 Pending'}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default TaskItem;