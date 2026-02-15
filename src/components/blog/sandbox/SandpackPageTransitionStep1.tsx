"use client";
import Sandpack from "./index";

const SandpackPageTransitionStep1 = () => {
  const files = {
    "/App.js": {
      code: `import { useState } from "react";
import { createPortal } from "react-dom";
import CardItem from "./CardItem";
import Modal from "./Modal";
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

  return (
    <>
      <div className="grid">
        {colors.map((item) => (
          <CardItem
            key={item.id}
            color={item.color}
            onClick={() => setSelectedItem(item)}
          />
        ))}
      </div>

      <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)}>
        <div className="content-wrapper">
          <div 
            className="modal-content"
            style={{ background: selectedItem?.color }} 
          />
          <button 
            className="back-button"
            onClick={() => setSelectedItem(null)}
          >
            Home
          </button>
        </div>
      </Modal>
    </>
  );
}`,
      active: true,
    },
    "/CardItem.js": {
      code: `export default function CardItem({ color, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ background: color }}
      className="card-item"
    />
  );
}`,
    },
    "/Modal.js": {
      code: `import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Store currently focused element
      previousActiveElement.current = document.activeElement;

      // Focus the modal
      modalRef.current?.focus();

      // Prevent body scroll
      document.body.style.overflow = "hidden";
    } else {
      // Restore body scroll
      document.body.style.overflow = "";

      // Restore focus to previous element
      previousActiveElement.current?.focus();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      ref={modalRef}
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex={-1}
    >
      {children}
    </div>
  );

  return createPortal(modalContent, document.body);
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
  transition: transform 0.2s ease;
}

.card-item:hover {
  transform: scale(1.025);
}

.card-item:active {
  transform: scale(0.975);
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

  return (
    <Sandpack
      files={files}
      template="react"
      dependencies={{
        react: "^18.0.0",
        "react-dom": "^18.0.0",
      }}
    />
  );
};

export default SandpackPageTransitionStep1;
