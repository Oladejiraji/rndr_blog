"use client";
import Sandpack from "./index";

const SandpackPageTransitionFinal = () => {
  const files = {
    "/App.js": {
      code: `import { useState, useEffect } from "react";
import CardItem from "./CardItem";
import Modal from "./Modal";
import Content from "./Content";
import "./styles.css";

const colors = [
  { id: 1, color: "oklch(0.982 0.015 295.0)" },
  { id: 2, color: "oklch(0.942 0.054 295.0)" },
  { id: 3, color: "oklch(0.886 0.091 295.0)" },
  { id: 4, color: "oklch(0.780 0.141 295.0)" },
  { id: 6, color: "oklch(0.594 0.191 295.0)" },
];

export default function App() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = (data) => {
    setSelectedItem(data);
    window.history.pushState(
      { id: data.id },
      "",
      \`/page-transition/\${data.id}\`
    );
  };

  const handleClose = () => {
    setSelectedItem(null);
    window.history.pushState({}, "", "/page-transition");
  };

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === "/page-transition") {
        setSelectedItem(null);
      } else {
        const slug = window.location.pathname.split("/page-transition/")[1];
        const parsed = parseInt(slug);
        const found = colors.find((color) => color.id === parsed);
        if (found) {
          setSelectedItem(found);
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <div className="app">
      <div className="grid">
        {colors.map((item) => (
          <CardItem
            key={item.id}
            color={item.color}
            onClick={() => handleClick(item)}
            layoutId={item.color}
            isItemSelected={
              selectedItem !== null && selectedItem.id !== item.id
            }
          />
        ))}
      </div>

      <Modal isOpen={!!selectedItem} onClose={handleClose}>
        <Content selectedItem={selectedItem} handleGoBack={handleClose} />
      </Modal>
    </div>
  );
}`,
      active: true,
    },
    "/CardItem.js": {
      code: `import { motion } from "framer-motion";

export default function CardItem({ 
  color, 
  onClick, 
  layoutId,
  isItemSelected = false 
}) {
  return (
    <motion.button
      onClick={onClick}
      layoutId={layoutId}
      style={{ background: color }}
      className="card-item"
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.975 }}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 30,
        opacity: {
          duration: 0.1,
          delay: isItemSelected ? 0 : 0.225,
        },
      }}
      animate={{
        opacity: isItemSelected ? 0 : 1,
      }}
    />
  );
}`,
    },
    "/Modal.js": {
      code: `import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      modalRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      previousActiveElement.current?.focus();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: [0.32, 0.72, 0, 1],
          }}
          ref={modalRef}
          className="modal"
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}`,
    },
    "/Content.js": {
      code: `import { motion } from "framer-motion";

export default function Content({ selectedItem, handleGoBack }) {
  return (
    <div className="content-wrapper">
      <motion.div
        layoutId={selectedItem?.color}
        style={{ background: selectedItem?.color }}
        className="modal-content"
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 30,
        }}
      />
      <button className="back-button" onClick={handleGoBack}>
        Home
      </button>
    </div>
  );
}`,
    },
    "/styles.css": {
      code: `* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #ffffff;
}

#root {
  width: 100%;
  min-height: 100vh;
}

.app {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow-y: auto;
}

.grid {
  width: 100%;
  max-width: 900px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.card-item {
  width: 100%;
  aspect-ratio: 4/3;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  position: relative;
  z-index: 1;
}

.modal {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: white;
  overflow-y: auto;
}

.content-wrapper {
  min-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 1rem;
}

.modal-content {
  width: 100%;
  max-width: 600px;
  aspect-ratio: 4/3;
  border-radius: 0.5rem;
  position: relative;
  z-index: 10;
}

.back-button {
  background: #F1F1F1;
  border-radius: 3.125rem;
  padding: 0.5rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #C3C3C5;
  border: none;
  cursor: pointer;
  line-height: 1.25rem;
  letter-spacing: -0.0056em;
  transition: opacity 0.2s ease;
}

.back-button:hover {
  opacity: 0.8;
}`,
    },
  };

  const dependencies = {
    react: "^18.0.0",
    "react-dom": "^18.0.0",
    "framer-motion": "^10.0.0",
  };

  return (
    <Sandpack
      files={files}
      template="react"
      dependencies={dependencies}
      autorun={true}
      defaultTab="preview"
    />
  );
};

export default SandpackPageTransitionFinal;
