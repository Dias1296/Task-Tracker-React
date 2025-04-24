import { useEffect, useState } from 'react'
import TaskList from './components/TaskList'
import AddTaskForm from './components/AddTaskForm'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);

  //Fetch tasks from backend when component mounts
  useEffect(() => {
    fetch('https://localhost:7236/api/task')
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error('Failed to fetch tasks:', err));
  }, []);
  
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Task Manager</h1>
      <AddTaskForm setTasks={setTasks} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
