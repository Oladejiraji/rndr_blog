"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const messageData = [
  {
    id: 1,
    name: "Alice Johnson",
    message: "Hey! Are we still on for the meeting tomorrow?",
    bg: "linear-gradient(135deg, #818CF8, #C084FC)",
    timeAgo: "2h",
    read: false,
  },
  {
    id: 2,
    name: "Bob Smith",
    message: "Don't forget to check out the new project updates.",
    bg: "linear-gradient(135deg, #F472B6, #FBBF24)",
    timeAgo: "2h",
    read: false,
  },
  {
    id: 3,
    name: "Charlie Davis",
    message: "Can you send me the files from last week?",
    bg: "linear-gradient(135deg, #34D399, #3B82F6)",
    timeAgo: "Yesterday",
    read: true,
  },
];

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [gooey, setGooey] = useState(true);
  const [slow, setSlow] = useState(false);
  const t = slow ? 4 : 1;

  return (
    <>
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="gooey">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 20 -10"
              result="gooey"
            />
            <feBlend in="SourceGraphic" in2="gooey" />
          </filter>
        </defs>
      </svg>

      <main className="w-screen h-screen flex justify-center items-start pt-[35vh] relative bg-white">
        <div
          className="relative"
          style={gooey ? { filter: "url(#gooey)" } : undefined}
        >
          <motion.div
            className="relative z-10 size-13 flex justify-center items-center border border-white/10 rounded-full bg-[#1a1a1a]"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <button
              className="size-13 rounded-full cursor-pointer bg-[#1a1a1a] flex items-center justify-center"
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
                className="absolute top-0 left-1/2 overflow-hidden bg-[#1a1a1a]"
                initial={{
                  width: 52,
                  height: 52,
                  borderRadius: 26,
                  y: 0,
                  x: "-50%",
                }}
                animate={{
                  width: 340,
                  height: 310,
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
                    y: {
                      duration: 0.6 * t,
                      delay: 0.15 * t,
                      ease: [0.22, 1, 0.36, 1],
                    },
                    width: { duration: 0.5 * t, ease: [0.22, 1, 0.36, 1] },
                    height: { duration: 0.5 * t, ease: [0.22, 1, 0.36, 1] },
                    borderRadius: {
                      duration: 0.5 * t,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
                transition={{
                  y: { duration: 0.5 * t, ease: [0.22, 1, 0.36, 1] },
                  width: {
                    duration: 0.6 * t,
                    delay: 0.1 * t,
                    ease: [0.22, 1, 0.36, 1],
                  },
                  height: {
                    duration: 0.6 * t,
                    delay: 0.1 * t,
                    ease: [0.22, 1, 0.36, 1],
                  },
                  borderRadius: {
                    duration: 0.6 * t,
                    delay: 0.1 * t,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }}
              >
                <motion.div
                  className="w-[340px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15 * t, ease: "easeIn" },
                  }}
                  transition={{
                    duration: 0.3 * t,
                    delay: 0.15 * t,
                    ease: "easeOut",
                  }}
                >
                  <div className="py-3 px-5 flex justify-between items-center">
                    <h1 className="text-white text-lg font-bold">Messages</h1>
                    <p className="text-[#8e8e93] text-xs">3 new</p>
                  </div>
                  <div className="px-2 pb-2">
                    {messageData.map((msg, i) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.25 * t,
                          delay: (0.2 + i * 0.05) * t,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                        className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-white/5 transition-colors"
                      >
                        <div>
                          <div
                            className="size-11 rounded-full"
                            style={{ background: msg.bg }}
                          />
                        </div>
                        <div>
                          <div className="flex justify-between items-center">
                            <p className="text-white text-sm">{msg.name}</p>
                            <p className="text-[0.6875rem] text-[#8e8e93]">
                              {msg.timeAgo}
                            </p>
                          </div>
                          <p
                            className={cn(
                              "text-[0.8125rem] text-white truncate max-w-[230px]",
                              {
                                "text-[#8e8e93]": msg.read,
                              },
                            )}
                          >
                            {msg.message}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="p-0">
                    <button className="w-full h-11 bg-[#1a1a1a] text-[0.8125rem] text-[#8e8e93] py-2 rounded-b-3xl border-t border-white/10 cursor-pointer hover:text-white transition-colors">
                      View All Messages
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="absolute top-6 flex gap-2">
          <button
            onClick={() => setGooey((prev) => !prev)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors",
              gooey ? "bg-[#1a1a1a] text-white" : "bg-[#e5e5e5] text-[#1a1a1a]",
            )}
          >
            Gooey {gooey ? "On" : "Off"}
          </button>
          <button
            onClick={() => setSlow((prev) => !prev)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors",
              slow ? "bg-[#1a1a1a] text-white" : "bg-[#e5e5e5] text-[#1a1a1a]",
            )}
          >
            {slow ? "Slow" : "Normal"}
          </button>
        </div>
      </main>
    </>
  );
};

export default Dropdown;
