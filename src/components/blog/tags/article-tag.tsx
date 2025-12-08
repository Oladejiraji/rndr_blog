"use client";

import { RiveAnimation } from "@/components/RiveAnimation";
import { useState } from "react";

const ArticleTag = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className="flex items-center  h-9 px-3.5 rounded-full gap-1 bg-[#E8F7F0]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mb-2">
        <RiveAnimation
          src="/article.riv"
          stateMachineName="Article"
          className="w-4 h-8"
          isHovered={isHovered}
          hoverInputName="Hover"
        />
      </div>
      <span className="text-[#70BB9C] font-sans text-xs ">Article</span>
    </button>
  );
};

export default ArticleTag;
