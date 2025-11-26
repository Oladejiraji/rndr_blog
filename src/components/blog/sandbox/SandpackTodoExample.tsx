"use client";
import Sandpack from "./index";

const SandpackTodoExample = () => {
  const todoFiles = {
    "/App.js": {
      code: `import React, { useState } from 'react';
import TodoList from './TodoList';
import './styles.css';

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build awesome projects', completed: false },
  ]);
  const [input, setInput] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: input, completed: false }
      ]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="app">
      <h1>📝 Todo App</h1>

      <form onSubmit={addTodo} className="add-todo">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button type="submit">Add</button>
      </form>

      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
}`,
      active: true,
    },
    "/TodoList.js": {
      code: `import React from 'react';

const TodoList = ({ todos, onToggle, onDelete }) => {
  if (todos.length === 0) {
    return <p className="empty-state">No todos yet. Add one above! 🎉</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo.id} className="todo-item">
          <label className="todo-content">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
            />
            <span className={todo.completed ? 'completed' : ''}>
              {todo.text}
            </span>
          </label>
          <button
            onClick={() => onDelete(todo.id)}
            className="delete-btn"
            aria-label="Delete"
          >
            🗑️
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;`,
    },
    "/styles.css": {
      code: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}

.add-todo {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.add-todo input {
  flex: 1;
  padding: 0.75rem;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s;
}

.add-todo input:focus {
  border-color: #4a9eff;
}

.add-todo button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background: #4a9eff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}

.add-todo button:hover {
  background: #357abd;
}

.todo-list {
  list-style: none;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: white;
  border: 2px solid #f0f0f0;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  transition: all 0.2s;
}

.todo-item:hover {
  border-color: #4a9eff;
  box-shadow: 0 2px 8px rgba(74, 158, 255, 0.1);
}

.todo-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  cursor: pointer;
}

.todo-content input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.todo-content span {
  font-size: 1rem;
  color: #333;
  transition: all 0.2s;
}

.todo-content span.completed {
  text-decoration: line-through;
  color: #999;
}

.delete-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
  padding: 0.25rem;
}

.delete-btn:hover {
  opacity: 1;
}

.empty-state {
  text-align: center;
  color: #999;
  padding: 3rem;
  font-size: 1.1rem;
}`,
    },
  };

  const dependencies = {
    react: "^18.0.0",
    "react-dom": "^18.0.0",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      q{" "}
      <Sandpack
        template="react"
        files={todoFiles}
        dependencies={dependencies}
        autorun={true}
        defaultTab="preview"
      />
    </div>
  );
};

export default SandpackTodoExample;
