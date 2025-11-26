"use client";
import { PostType } from "@/components/blog/code/types";
import SearchInput from "@/components/shared/search-input";
import { Spotlight } from "@/components/shared/spotlight";
import { Search } from "@/components/svg";
import { useCommandK } from "@/hooks/useKeyboardShortcut";
import React, { useState } from "react";

const BlogSpotlight = ({ articleData }: { articleData: PostType[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Open modal with Cmd+K (Mac) or Ctrl+K (Windows)
  useCommandK(() => setIsOpen(true));

  return (
    <>
      <Spotlight
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        articleData={articleData}
      />
      <div className="w-full flex justify-center">
        <button className="" onClick={() => setIsOpen(true)}>
          <div className="touch-none block md:hidden p-2 rounded-full bg-gray-100">
            <Search />
          </div>
          <div className="touch-none hidden md:block">
            <SearchInput />
          </div>
        </button>
      </div>
    </>
  );
};

export default BlogSpotlight;
