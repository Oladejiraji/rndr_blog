"use client";
import Link from "next/link";
import React, { useState } from "react";
import { RiveAnimation } from "@/components/RiveAnimation";

const EmailLInk = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link
      href="mailto:rndrrealm@gmail.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        className="text-gray-900 flex items-center gap-0 bg-gray-100 rounded-[30px]  pl-2.5 pr-3.5 hover:bg-gray-200 transition-all group w-22 hover:w-33"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-fit mb-2">
          <RiveAnimation
            src="/mail.riv"
            stateMachineName="Mail"
            className="w-6 h-6"
            isHovered={isHovered}
            hoverInputName="Hover"
          />
        </div>
        <div className="relative flex justify-end w-full">
          <span className="absolute left-0 text-base opacity-0 group-hover:opacity-100 transition-opacity">
            Open
          </span>
          <span className="text-base font-medium">Email</span>
        </div>
      </div>
    </Link>
  );
};

export default EmailLInk;
