"use client";
import Sandpack from "./index";

const SandpackGooeyDropdown = () => {
  const files = {
    "/App.js": {
      code: `import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles.css";

const messageData = [
  {
    id: 1,
    name: "Alice Johnson",
    message: "Hey! Are we still on for the meeting tomorrow?",
    bg: "linear-gradient(135deg, #818CF8, #C084FC)",
    timeAgo: "2h",
  },
  {
    id: 2,
    name: "Bob Smith",
    message: "Don't forget to check out the new project updates.",
    bg: "linear-gradient(135deg, #F472B6, #FBBF24)",
    timeAgo: "2h",
  },
  {
    id: 3,
    name: "Charlie Davis",
    message: "Can you send me the files from last week?",
    bg: "linear-gradient(135deg, #34D399, #3B82F6)",
    timeAgo: "Yesterday",
  },
];

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [gooey, setGooey] = useState(true);

  return (
    <>
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
              result="gooey"
            />
            <feBlend in="SourceGraphic" in2="gooey" />
          </filter>
        </defs>
      </svg>

      <div className="container">
        <div
          className="dropdown-wrapper"
          style={gooey ? { filter: "url(#gooey)" } : undefined}
        >
          <motion.div
            className="button-wrapper"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <button
              className="trigger-button"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </button>
          </motion.div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="dropdown-panel"
                initial={{
                  width: 52,
                  height: 52,
                  borderRadius: 26,
                  y: 0,
                  x: "-50%",
                }}
                animate={{
                  width: 320,
                  height: 290,
                  borderRadius: 24,
                  y: 70,
                  x: "-50%",
                }}
                exit={{
                  width: 52,
                  height: 52,
                  borderRadius: 26,
                  y: 0,
                  x: "-50%",
                  transition: {
                    y: { duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] },
                    width: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                    height: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                    borderRadius: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                transition={{
                  y: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                  width: { duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
                  height: { duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
                  borderRadius: { duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
                }}
              >
                <motion.div
                  className="dropdown-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, ease: "easeIn" },
                  }}
                  transition={{ duration: 0.3, delay: 0.15, ease: "easeOut" }}
                >
                  <div className="dropdown-header">
                    <h1 className="dropdown-title">Messages</h1>
                    <p className="dropdown-count">3 new</p>
                  </div>
                  <div className="dropdown-messages">
                    {messageData.map((msg, i) => (
                      <motion.div
                        key={msg.id}
                        className="message-row"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.25,
                          delay: 0.2 + i * 0.05,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                      >
                        <div className="avatar" style={{ background: msg.bg }} />
                        <div className="message-body">
                          <div className="message-top">
                            <p className="message-name">{msg.name}</p>
                            <p className="message-time">{msg.timeAgo}</p>
                          </div>
                          <p className="message-text">{msg.message}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <button className="view-all">View All Messages</button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="controls">
          <button
            onClick={() => setGooey((prev) => !prev)}
            className={gooey ? "control-btn active" : "control-btn"}
          >
            Gooey {gooey ? "On" : "Off"}
          </button>
        </div>
      </div>
    </>
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

.container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 30vh;
  position: relative;
  background: white;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.dropdown-wrapper {
  position: relative;
}

.button-wrapper {
  position: relative;
  z-index: 10;
  width: 52px;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.trigger-button {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  cursor: pointer;
  background: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
}

.dropdown-panel {
  position: absolute;
  top: 0;
  left: 50%;
  overflow: hidden;
  background: #1a1a1a;
}

.dropdown-content {
  width: 320px;
}

.dropdown-header {
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dropdown-title {
  color: white;
  font-size: 18px;
  font-weight: 700;
}

.dropdown-count {
  color: #8e8e93;
  font-size: 12px;
}

.dropdown-messages {
  padding: 0 8px 8px;
}

.message-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.2s;
}

.message-row:hover {
  background: rgba(255, 255, 255, 0.05);
}

.avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  flex-shrink: 0;
}

.message-body {
  flex: 1;
  min-width: 0;
}

.message-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.message-name {
  color: white;
  font-size: 14px;
}

.message-time {
  color: #8e8e93;
  font-size: 11px;
}

.message-text {
  color: white;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 220px;
}

.view-all {
  width: 100%;
  height: 44px;
  background: #1a1a1a;
  color: #8e8e93;
  font-size: 13px;
  padding: 8px;
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0 0 24px 24px;
  cursor: pointer;
  transition: color 0.2s;
}

.view-all:hover {
  color: white;
}

.controls {
  position: absolute;
  top: 24px;
  display: flex;
  gap: 8px;
}

.control-btn {
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
  background: #e5e5e5;
  color: #1a1a1a;
}

.control-btn.active {
  background: #1a1a1a;
  color: white;
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
        files={files}
        dependencies={dependencies}
        autorun={true}
        defaultTab="preview"
      />
    </div>
  );
};

export default SandpackGooeyDropdown;
