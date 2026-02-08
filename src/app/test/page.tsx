"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const Test = () => {
  const [value, setValue] = useState("0");
  const [pressed, setPressed] = useState(false);

  const currentValue = value ? Number(value) : 0;
  const percentage = ((currentValue - 0) / (100 - 0)) * 100;

  // Hide edge labels when thumb is within 10% of them
  const showMinLabel = percentage > 12;
  const showMaxLabel = percentage < 86;

  const dotPositions = [25, 50, 75];

  return (
    <main className="w-screen h-screen flex justify-center items-center bg-[#121317]">
      <div>
        <div className="relative mb-4 h-5 w-100 ">
          {/* Min label */}

          <motion.span
            className="absolute left-0 text-ideal text-white py-1 px-1.5 bg-[#1A1B20] rounded-[6px] block"
            style={{ opacity: showMinLabel ? 1 : 0 }}
          >
            $0
          </motion.span>

          {/* Current value label following thumb */}
          <span
            className="absolute -translate-x-1/2 text-white font-medium text-ideal py-1 px-1.5"
            style={{ left: `${percentage}%` }}
          >
            {Math.round(percentage)}%
          </span>
          {/* Max label */}

          <motion.span
            className="absolute right-0 text-ideal font-medium py-1 px-1.5 text-[#01C966]"
            style={{ opacity: showMaxLabel ? 1 : 0 }}
          >
            Max
          </motion.span>
        </div>
        <div className="w-100 relative">
          <input
            type="range"
            name=""
            id="test"
            min="0"
            max="100"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onPointerDown={() => setPressed(true)}
            onPointerUp={() => setPressed(false)}
            className="w-full  z-20 relative"
          />

          <div className="">
            {/* Left track */}
            <div
              className="h-7  absolute left-0 top-0 rounded-[30px] "
              style={{
                width: `${Math.max(0, Number(value) - 5)}%`,
                background:
                  "linear-gradient(90deg, #7637BA 0%, #009C84 50%, #7A97DE 100%)",
              }}
            />
            {/* Right track */}
            <div
              className="h-7 bg-[#202127] absolute right-0 top-0 rounded-[30px] "
              style={{
                width: `${Math.max(0, 100 - (Number(value) + 5))}%`,
              }}
            />
            {/* Thumb */}
            <motion.div
              className="size-7 rounded-full bg-[#202127] test_shadow z-[1]"
              animate={{ scale: pressed ? 1.2 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              style={{
                position: "absolute",
                top: 0,
                left: `${Number(value)}%`,
                translateX: "-50%",
              }}
            />
          </div>

          {dotPositions.map((position) => {
            const dotPercentage = ((position - 0) / (100 - 0)) * 100;
            // Check if any thumb has passed this dot position
            const isPassed = Number(value) >= position;
            return (
              <div
                key={position}
                className={cn(
                  "absolute rounded-full z-0 transition-colors size-4 top-[42%] -translate-y-1/2 -translate-x-1/2",
                  isPassed ? "bg-white/80" : "bg-white/30",
                )}
                style={{ left: `${dotPercentage}%` }}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Test;
