import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Input } from "../ui/input";
import { ArticleIcon, Search } from "../svg";
import Link from "next/link";
import { useState } from "react";
import { PostType } from "../blog/code/types";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  articleData: PostType[];
}

export function Spotlight({ isOpen, onClose, articleData }: IProps) {
  const [value, setValue] = useState("");

  // Filter articles based on search input
  const filteredArticles = articleData.filter((article) => {
    const searchTerm = value.toLowerCase().trim();

    if (!searchTerm) return true; // Show all articles when search is empty

    return (
      article.title.toLowerCase().includes(searchTerm) ||
      article.description.toLowerCase().includes(searchTerm) ||
      article.category.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-174 max-w-[425px] p-0 rounded-[20px] space-y-0 gap-0 font-sans top-[20%]! translate-y-0 translate-x-[-50%]!">
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>Search Articles</DialogTitle>
          </VisuallyHidden>
          <VisuallyHidden>
            <DialogDescription>
              Search through blog posts by title, description, or category.
            </DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <div>
          <div className="relative">
            <div className="absolute left-3.5 top-[50%] translate-y-[-50%] ">
              <Search />
            </div>
            <Input
              className="rounded-t-[20px] rounded-b-none border-none pl-10 pr-4 py-5 h-16 placeholder:text-gray-1100 text-base"
              placeholder="Search Keywords or Blog Posts"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div className=" py-3.5">
            <div>
              <h3 className="px-4 py-2.5 text-gray-1050 text-xs">ARTICLES</h3>
              <div className="flex flex-col ">
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((article, i) => (
                    <Link
                      key={i}
                      href={`/blog/${article.slug}`}
                      className="flex items-center py-2 px-4 gap-3 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={onClose}
                    >
                      <div className="size-10 rounded-lg bg-gray-50" />
                      <div className="flex-1">
                        <h3 className="pb-0 text-gray-800 text-base">
                          {article.title}
                        </h3>
                        <p className="text-gray-800 text-xs">
                          {article.description}
                        </p>
                      </div>
                      <div className="size-9 rounded-full flex items-center justify-center bg-[#E8F7F0]">
                        <ArticleIcon fill="#70BB9C" />
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="flex flex-col justify-center w-full items-center pt-8 pb-12">
                    <p className="text-gray-1050 text-sm pb-1 ">
                      No results &quot;{value}&quot;
                    </p>
                    <p className="text-mid text-gray-600">
                      Is there something you’d like to see on the blog?
                    </p>
                    <div className="pt-4">
                      <Link
                        href="mailto:rndrrealm@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="bg-gray-900 rounded-[30px] h-9 px-4 text-[#FCFCFC] flex items-center justify-center">
                          Contact the team
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
