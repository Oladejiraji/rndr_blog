"use client";
import Link from "next/link";
import React, { useState } from "react";
import { XIcon } from "@/components/svg";

const TwitterLinkMobile = () => {
  return (
    <Link
      href="https://x.com/rndr_realm"
      target="_blank"
      rel="noopener noreferrer"
      className="md:hidden"
    >
      <div className="text-gray-900 flex items-center gap-1 bg-gray-100 rounded-[30px] py-2 px-4">
        <XIcon className="size-3.5" />
        <span className="text-xs font-medium">Twitter (X)</span>
      </div>
    </Link>
  );
};

const TwitterLink = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      <Link
        href="https://x.com/rndr_realm"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:block"
      >
        <div
          className="text-gray-900 flex items-center  bg-gray-100 rounded-[30px] py-2.5 pl-3.5 pr-4.5 hover:bg-gray-200 transition-all group w-29.5 hover:w-37.5"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="w-fit">
            <XIcon className="size-4" />
          </div>
          <div className="relative flex justify-end w-full">
            <span className="absolute left-0 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              Open
            </span>
            <span className="text-sm font-medium">Twitter (X)</span>
          </div>
        </div>
      </Link>
      <TwitterLinkMobile />
    </>
  );
};

export default TwitterLink;
