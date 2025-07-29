import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("todos");
    if (data) setTodos(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() !== "") {
      setTodos([...todos, { text: input, done: false }]);
      setInput("");
    }
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const toggleDone = (index) => {
    const newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">📝 My To-Do List</h1>
      <div className="input-container">
        <input
          className="todo-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ajouter une tâche..."
        />
        <button className="add-button" onClick={addTodo}>
          Ajouter
        </button>
      </div>

      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            todo={todo}
            onDelete={() => deleteTodo(index)}
            onToggle={() => toggleDone(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
