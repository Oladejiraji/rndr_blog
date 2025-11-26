"use client";
import Sandpack from "./index";

const SandpackAnimationExample = () => {
  const animationFiles = {
    "/App.js": {
      code: `import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './styles.css';

const items = [
  { id: 1, title: 'First Item', color: '#FF6B6B' },
  { id: 2, title: 'Second Item', color: '#4ECDC4' },
  { id: 3, title: 'Third Item', color: '#45B7D1' },
  { id: 4, title: 'Fourth Item', color: '#FFA07A' },
];

export default function App() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="app">
      <h1>✨ Framer Motion Demo</h1>
      <p className="subtitle">Click on any card to expand it!</p>

      <div className="grid">
        {items.map((item) => (
          <motion.div
            key={item.id}
            layoutId={item.id}
            onClick={() => setSelectedId(item.id)}
            className="card"
            style={{ backgroundColor: item.color }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.h2>{item.title}</motion.h2>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && (
          <>
            <motion.div
              className="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
            />
            <motion.div
              layoutId={selectedId}
              className="expanded-card"
              style={{
                backgroundColor: items.find(i => i.id === selectedId)?.color
              }}
            >
              <motion.h2>
                {items.find(i => i.id === selectedId)?.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                This is an expanded view with more details.
                Framer Motion provides smooth layout animations!
              </motion.p>
              <motion.button
                onClick={() => setSelectedId(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Close
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}`,
      active: true,
    },
    "/styles.css": {
      code: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

h1 {
  text-align: center;
  color: white;
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
}

.subtitle {
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.card {
  padding: 2rem;
  border-radius: 16px;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 150px;
}

.card h2 {
  color: white;
  font-size: 1.5rem;
  text-align: center;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 10;
}

.expanded-card {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 500px;
  padding: 3rem;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  z-index: 20;
  text-align: center;
}

.expanded-card h2 {
  color: white;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.expanded-card p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.expanded-card button {
  background: white;
  color: #333;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}`,
    },
  };

  const dependencies = {
    react: "^18.0.0",
    "react-dom": "^18.0.0",
    "framer-motion": "^10.0.0",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Sandpack
        template="react"
        files={animationFiles}
        dependencies={dependencies}
        autorun={true}
        defaultTab="preview"
      />
    </div>
  );
};

export default SandpackAnimationExample;
