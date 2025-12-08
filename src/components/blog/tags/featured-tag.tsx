"use client";

import { RiveAnimation } from "@/components/RiveAnimation";
import { useState } from "react";

const FeaturedTag = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className="flex items-center  h-9 px-3.5 rounded-full gap-0 bg-[#EAF2FF]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mb-0">
        <RiveAnimation
          src="/featured.riv"
          stateMachineName="Featured"
          className="w-6 h-12"
          isHovered={isHovered}
          hoverInputName="Hover"
        />
      </div>
      <span className="text-[#5F8DBE] font-sans text-xs ">Featured</span>
    </button>
  );
};

export default FeaturedTag;
