"use client";
import Link from "next/link";
import React, { useState } from "react";
import { RiveAnimation } from "@/components/RiveAnimation";

const EmailLinkMobile = () => {
  return (
    <Link
      href="mailto:hello@rndrealm.com"
      target="_blank"
      rel="noopener noreferrer"
      className="md:hidden"
    >
      <div className="text-gray-900 flex items-center gap-1 bg-gray-100 rounded-[30px] py-2 px-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
        <span className="text-xs font-medium">Mail</span>
      </div>
    </Link>
  );
};

const EmailLInk = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      <Link
        href="mailto:hello@rndrealm.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:block"
      >
        <div
          className="text-gray-900 flex items-center gap-0 bg-gray-100 rounded-[30px] py-1 pl-7.5 pr-8.5 hover:bg-gray-200 transition-all group w-29.5 hover:w-38.5"
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
            <span className="absolute left-0 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              Open
            </span>
            <span className="text-sm font-medium">Mail</span>
          </div>
        </div>
      </Link>
      <EmailLinkMobile />
    </>
  );
};

export default EmailLInk;
