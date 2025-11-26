"use client";

import React, { useState } from "react";
import * as motion from "motion/react-client";
import { CopyIcon, TickIcon } from "@/components/svg";

interface CopyButtonProps {
  codeString: string;
}

export const CopyButton = ({ codeString }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <motion.button
      onClick={handleCopy}
      className="cursor-pointer focus:outline-none rounded-md  size-7.5 flex items-center justify-center"
      aria-label="Copy code"
      // whileHover={{ backgroundColor: "#ff0000" }}
      initial={{ backgroundColor: "#F6F6F6" }}
      whileHover={{ backgroundColor: "#E6E6E6" }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.1 }}
    >
      <motion.div
        initial={false}
        animate={{
          scale: isCopied ? [1, 1.2, 1] : 1,
          rotate: isCopied ? [0, 10, -10, 0] : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {isCopied ? <TickIcon /> : <CopyIcon />}
      </motion.div>
    </motion.button>
  );
};
