"use server";

import { PostType } from "@/components/blog/code/types";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

const root = process.cwd();

export const getAllPosts = async (): Promise<Array<PostType>> => {
  const files = fs.readdirSync(path.join(root, "content"));

  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((postSlug: string) => {
      const source = fs.readFileSync(
        path.join(root, "content", postSlug),
        "utf8"
      );
      console.log(source);
      const parsedFile = matter(source);

      return parsedFile.data as PostType;
    })
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
};
