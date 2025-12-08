"use client";
import Link from "next/link";
import React, { useState } from "react";
import { RiveAnimation } from "@/components/RiveAnimation";

const GithubLink = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link
      href="https://x.com/rndr_realm"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        className="text-gray-900 flex items-center gap-0.5  bg-gray-100 rounded-[30px]  pl-2.5 pr-3.5 hover:bg-gray-200 transition-all group w-25 hover:w-35.5"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-fit">
          <RiveAnimation
            src="/github.riv"
            stateMachineName="Github SM"
            className="w-6 h-9"
            isHovered={isHovered}
            hoverInputName="Hover"
          />
        </div>
        <div className="relative flex justify-end w-full">
          <span className="absolute left-0 text-base opacity-0 group-hover:opacity-100 transition-opacity">
            Open
          </span>
          <span className="text-base font-medium">Github</span>
        </div>
      </div>
    </Link>
  );
};

export default GithubLink;
