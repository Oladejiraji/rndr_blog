"use client";
import Sandpack from "./index";

const SandpackExample = () => {
  // Example files for a React component
  const exampleFiles = {
    "/App.js": {
      code: `import React, { useState } from 'react';
import './styles.css';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>

      <div className="counter">
        <button onClick={() => setCount(count - 1)}>-</button>
        <span>Count: {count}</span>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
    </div>
  );
}`,
      active: true,
    },
    "/styles.css": {
      code: `.App {
  font-family: sans-serif;
  text-align: center;
  padding: 2rem;
}

.counter {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.counter button {
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  border: 2px solid #333;
  background: white;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
}

.counter button:hover {
  background: #333;
  color: white;
}

.counter span {
  font-size: 1.5rem;
  font-weight: bold;
  min-width: 120px;
}`,
    },
  };

  // Example dependencies
  const exampleDependencies = {
    react: "^18.0.0",
    "react-dom": "^18.0.0",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Sandpack
        template="react"
        files={exampleFiles}
        dependencies={exampleDependencies}
        autorun={true}
        defaultTab="preview"
      />
    </div>
  );
};

export default SandpackExample;
