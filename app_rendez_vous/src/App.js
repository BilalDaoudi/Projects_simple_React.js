import React, { useState, useEffect } from "react";
import Task from "./Task";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [titre, setTitre] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!titre || !date) return alert("Complète tous les champs !");
    const newTask = { titre, date, done: false };
    setTasks([...tasks, newTask].sort((a, b) => new Date(a.date) - new Date(b.date)));
    setTitre("");
    setDate("");
  };

  const toggleDone = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="app-container">
      <h1>📋 Gestion de Tâches / Rendez-vous</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Titre..."
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={addTask}>Ajouter</button>
      </div>

      <div className="task-list">
        {tasks.map((task, index) => (
          <Task
            key={index}
            task={task}
            onToggle={() => toggleDone(index)}
            onDelete={() => deleteTask(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
