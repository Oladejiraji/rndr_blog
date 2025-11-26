import React from "react";

interface IProps {
  label: string;
  icon: React.ReactNode;
  textColor: string;
  bgColor: string;
}

const ArticleTag = (props: IProps) => {
  const { label, icon, textColor, bgColor } = props;
  return (
    <div
      className="flex items-center  h-9 px-3.5 rounded-full gap-1"
      style={{ backgroundColor: bgColor }}
    >
      {icon}
      <span
        className="text-gray-900 font-sans text-xs "
        style={{ color: textColor }}
      >
        {label}
      </span>
    </div>
  );
};

export default ArticleTag;
