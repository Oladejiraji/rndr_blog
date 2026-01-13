"use client";

import { RiveAnimation } from "@/components/RiveAnimation";
import { useState } from "react";

const ExplorationTag = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className="flex items-center  h-9 px-3.5 rounded-full gap-0 bg-[#FFEDE3]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mb-0">
        <RiveAnimation
          src="/3d.riv"
          stateMachineName="3D Exp flow"
          className="w-6 h-12"
          isHovered={isHovered}
          hoverInputName="Hover"
        />
      </div>
      <span className="text-[#C97038] font-medium font-sans text-xs ">
        3D Exploration
      </span>
    </button>
  );
};

export default ExplorationTag;
