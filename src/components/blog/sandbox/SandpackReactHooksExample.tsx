"use client";
import Sandpack from "./index";

const files = {
  "/App.js": {
    code: `import React, { useState, useEffect } from 'react';
import './styles.css';

function Counter() {
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setCount(count => count + 1);
      }, 1000);
    } else if (!isActive && count !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, count]);

  const handleReset = () => {
    setCount(0);
    setIsActive(false);
  };

  return (
    <div className="counter-container">
      <h1 className="title">React Hooks Counter</h1>
      <div className="counter-display">
        {count}
      </div>
      <div className="button-group">
        <button
          className="btn btn-primary"
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? '⏸ Pause' : '▶ Start'}
        </button>
        <button
          className="btn btn-secondary"
          onClick={handleReset}
        >
          🔄 Reset
        </button>
        <button
          className="btn btn-success"
          onClick={() => setCount(count + 1)}
        >
          ➕ Add
        </button>
        <button
          className="btn btn-danger"
          onClick={() => setCount(count - 1)}
          disabled={count === 0}
        >
          ➖ Subtract
        </button>
      </div>
      <div className="info">
        <p>Status: <strong>{isActive ? 'Running' : 'Stopped'}</strong></p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="app">
      <Counter />
    </div>
  );
}`,
    active: true,
  },
  "/styles.css": {
    code: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.app {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: 20px;
}

.counter-container {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 500px;
  width: 100%;
}

.title {
  color: #333;
  font-size: 28px;
  margin-bottom: 30px;
  font-weight: 700;
}

.counter-display {
  font-size: 72px;
  font-weight: bold;
  color: #667eea;
  margin: 30px 0;
  padding: 30px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 15px;
  transition: all 0.3s ease;
}

.button-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin: 30px 0;
}

.btn {
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
}

.btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.btn:active:not(:disabled) {
  transform: translateY(0);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.btn-secondary {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.btn-success {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.btn-danger {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.info {
  margin-top: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
  color: #666;
}

.info p {
  font-size: 14px;
  margin: 0;
}

.info strong {
  color: #667eea;
}`,
    hidden: false,
  },
};

const SandpackReactHooksExample = () => {
  return (
    <Sandpack
      template="react"
      autorun={true}
      defaultTab="preview"
      files={files}
    />
  );
};

export default SandpackReactHooksExample;
