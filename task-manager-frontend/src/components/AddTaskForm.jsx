import { useState } from "react";

function AddTaskForm({ setTasks }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const token = localStorage.getItem("token");

  //Called when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault(); //Prevents page reload on form submit

    //Build the task object
    const newTask = {
      title,
      description,
      isCompleted: false
    };

    const res = await fetch('https://localhost:7236/api/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(newTask)
    });

    if (res.ok) {
      const createdTask = await res.json();

      //Add the new task to the current list
      setTasks((prev) => [...prev, createdTask]);

      //Clear the input fields
      setTitle('');
      setDescription('');
    } else {
      console.error('Failed to create task');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h2>Add New Task</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
      />
      <button type="submit">Add Task</button>
    </form>
  )
}

export default AddTaskForm;