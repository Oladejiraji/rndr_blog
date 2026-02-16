import { MDXRemoteSerializeResult } from "next-mdx-remote";

export type ReadingTime = {
  text: string;
};

export type Post = {
  title: string;
  description: string;
  date: string;
  updated: string;
  author: string;
  "author-link"?: string;
  slug: string;
  category: string;
  published: boolean;
  tags?: {
    label: string;
    iconFill: string;
    textColor: string;
    bgColor: string;
    type: "featured" | "article";
  }[];
  colorFeatured?: string;
  featured?: boolean;
  fontFeatured?: string;
  keywords?: string[];
  subtitle?: string;
  seoTitle?: string;
};

export type FrontMatterPost = {
  frontMatter: Post & {
    readingTime: ReadingTime;
  };
  tweetIDs: string[];
  mdxSource: MDXRemoteSerializeResult;
};
