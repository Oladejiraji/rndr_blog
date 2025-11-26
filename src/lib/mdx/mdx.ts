import fs from "fs";
import matter from "gray-matter";
import path from "path";
import readingTime from "reading-time";
import { FrontMatterPost } from "@/types/post";

const root = process.cwd();

export const getFileBySlug = async (slug: string): Promise<FrontMatterPost> => {
  // eslint-disable-next-line no-console

  const source = fs.readFileSync(
    path.join(root, "content", `${slug}.mdx`),
    "utf8"
  );

  const parsedFile = matter(source);

  const data = parsedFile.data;
  const content = parsedFile.content;

  const result = {
    mdxSource: content,
    frontMatter: {
      readingTime: readingTime(content),
      ...data,
    },
  };

  return result as unknown as FrontMatterPost;
};
