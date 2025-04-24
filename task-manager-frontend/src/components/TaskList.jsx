import { useState } from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, setTasks }){
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const handleToggleComplete = async (taskId, currentStatus) => {
    const taskToUpdate = tasks.find((t) => t.id === taskId);

    //Clone and modify the full task object
    const updatedTask = {...taskToUpdate, isCompleted: !currentStatus};

    const res = await fetch(`https://localhost:7236/api/task/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTask) //Send the full object
    });

    if (res.ok) {
      //Update local state
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, isCompleted: !currentStatus } : task 
        )
      );
    } else {
      console.error('Failed to update task status');
    }
  };

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditTitle('');
    setEditDescription('');
  }

  const handleSaveEdit = async (taskId) => {
    const originalTask = tasks.find((t) => t.id === taskId);

    const updatedTask = {
      ...originalTask,
      title: editTitle,
      description: editDescription
    };

    const res = await fetch(`https://localhost:7236/api/task/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    });

    if (res.ok) {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? updatedTask : t))
    );
    handleCancelEdit();
    } else {
      console.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`https://localhost:7236/api/task/${taskId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        //Remove task from the local state
        setTasks(tasks.filter((task) => task.id !== taskId));
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      {tasks.length === 0 && <p>No tasks found.</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ marginBottom: '1rem' }}>
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => handleToggleComplete(task.id, task.isCompleted)}
              style={{ marginRight: '0.5rem' }}
            />
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <input 
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(task.id)}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <strong
                  style={{ textDecoration: task.isCompleted ? 'line-through' : 'none'}}>
                  {task.title}
                </strong>
                <p>{task.description}</p>
                <button onClick={() => handleEditClick(task)}>Edit</button>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;