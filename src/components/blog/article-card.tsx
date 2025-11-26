import React from "react";
import { ArrowRightIcon } from "../svg";
import Link from "next/link";
import { PostType } from "./code/types";
import ArticleTag from "./article-tag";
import { iconMap } from "@/lib/icon-map";

interface IProps {
  article: PostType;
}

const ArticleCard = ({ article }: IProps) => {
  return (
    <div>
      <div className="flex items-center justify-end gap-1 pb-3">
        {article.tags.map((tag, i) => (
          <ArticleTag
            label={tag.label}
            textColor={tag.textColor}
            bgColor={tag.bgColor}
            icon={iconMap[tag.type](tag.iconFill)}
            key={i}
          />
        ))}
      </div>
      <Link
        href={`/blog/${article.slug}`}
        className="block bg-gray-050 p-4 md:p-8 rounded-[1.25rem]"
      >
        <div className="pb-6 pt-23">
          <h2 className="text-gray-900 font-medium text-lg md:text-xl pb-1">
            {article.title}
          </h2>
          <p className="text-gray-600 text-xxs">{article.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-8 bg-background rounded-full flex items-center justify-center">
            <ArrowRightIcon />
          </div>
          <p className="text-gray-900 text-xxs">READ THE ARTICLE</p>
        </div>
      </Link>
    </div>
  );
};

export default ArticleCard;
