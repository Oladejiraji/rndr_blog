"use client";

import { useState } from "react";
import { LinkIcon, TickIcon } from "@/components/svg";
import { AnimatePresence, motion } from "motion/react";

export function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="size-8 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer relative"
      aria-label="Copy article link"
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="tick"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center"
          >
            <TickIcon pathClassName="fill-black" />
          </motion.span>
        ) : (
          <motion.span
            key="link"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center"
          >
            <LinkIcon />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
