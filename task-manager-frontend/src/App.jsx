import { useEffect, useState } from 'react'
import TaskList from './components/TaskList'
import AddTaskForm from './components/AddTaskForm'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'

function App() {
  const [tasks, setTasks] = useState([]);

  //Fetch tasks from backend when component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch('https://localhost:7236/api/task', {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error('Failed to fetch tasks:', err));
  }, []);
  
  /*return (
    <div style={{ padding: '2rem' }}>
      <h1>Task Manager</h1>
      <AddTaskForm setTasks={setTasks} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );*/

  return (
    <Router>
      <div>
        <h1>Task Manager</h1>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/task" element={<>
            <AddTaskForm setTasks={setTasks} />
            <TaskList tasks={tasks} setTasks={setTasks} />
          </>} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
