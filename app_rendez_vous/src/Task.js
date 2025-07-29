import React from "react";
import "./App.css";

function Task({ task, onToggle, onDelete }) {
  return (
    <div className={`task-item ${task.done ? "done" : ""}`} onClick={onToggle}>
      <div>
        <h3>{task.titre}</h3>
        <p>{new Date(task.date).toLocaleDateString()}</p>
      </div>
      <button onClick={(e) => { e.stopPropagation(); onDelete(); }}>🗑️</button>
    </div>
  );
}

export default Task;
