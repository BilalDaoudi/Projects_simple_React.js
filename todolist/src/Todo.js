import React from "react";
import "./App.css";

function Todo({ todo, onDelete, onToggle }) {
  return (
    <div
      className={`todo-item ${todo.done ? "done" : ""}`}
      onClick={onToggle}
    >
      <span>{todo.text}</span>
      <button className="delete-button" onClick={(e) => { e.stopPropagation(); onDelete(); }}>
        ❌
      </button>
    </div>
  );
}

export default Todo;
