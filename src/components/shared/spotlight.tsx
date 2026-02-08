"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Input } from "../ui/input";
import { ArticleIcon, BackIcon, Search } from "../svg";
import Link from "next/link";
import { useState } from "react";
import { PostType } from "../blog/code/types";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/useMediaQuery";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  articleData: PostType[];
  className?: string;
}

// Shared content component
function SearchContent({
  value,
  setValue,
  filteredArticles,
  onClose,
}: {
  value: string;
  setValue: (value: string) => void;
  filteredArticles: PostType[];
  onClose: () => void;
}) {
  return (
    <div>
      <div className="relative mx-5 md:mx-0">
        <div className="absolute left-3.5 top-[50%] translate-y-[-50%] z-10">
          <Search />
        </div>
        <Input
          className="rounded-t-[20px] rounded-b-[20px] md:rounded-b-none border-[red]! md:rounded-t-[18px] bg-[#F5F5F5] md:bg-transparent rounded-full  border-none pl-10 pr-4 py-5 h-10 md:h-16 placeholder:text-gray-1100 text-base "
          placeholder="Search Keywords or Blog Posts"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="py-3.5 border-t mt-5 md:mt-0 md:border-t-0 border-[#F1F1F1]">
        <div>
          <h3 className="px-4 py-2.5 text-gray-1050 text-xs">ARTICLES</h3>
          <div className="flex flex-col">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article, i) => (
                <Link
                  key={i}
                  href={`/${article.slug}`}
                  className="flex items-center py-2 px-4 gap-3 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={onClose}
                >
                  <div className="size-10 rounded-lg bg-gray-50" />
                  <div className="flex-1">
                    <h3 className="pb-0 text-gray-800 text-sm md:text-base">
                      {article.title}
                    </h3>
                    <p className="text-gray-800 text-xxs md:text-xs">
                      {article.description}
                    </p>
                  </div>
                  <div className="hidden size-9 rounded-full md:flex items-center justify-center bg-[#E8F7F0]">
                    <ArticleIcon fill="#70BB9C" />
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex flex-col justify-center w-full items-center pt-8 pb-12">
                <p className="text-gray-1050 text-sm pb-1">
                  No results &quot;{value}&quot;
                </p>
                <p className="text-mid text-gray-600">
                  Is there something you&apos;d like to see on the blog?
                </p>
                <div className="pt-4">
                  <Link
                    href="mailto:hello@rndrealm.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="bg-gray-900 rounded-[30px] text-sm md:text-base h-8 md:h-9 px-3.5 md:px-4 text-[#FCFCFC] flex items-center justify-center">
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
  );
}

export function Spotlight({ isOpen, onClose, articleData, className }: IProps) {
  const [value, setValue] = useState("");
  const isMobile = useIsMobile();

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

  // Mobile: Sheet
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent
          side="bottom"
          className={cn(
            "p-0 rounded-t-[20px] space-y-0 gap-0 font-sans h-screen rounded-none",
            className,
          )}
        >
          <SheetHeader className="p-0">
            <VisuallyHidden>
              <SheetTitle>Search Articles</SheetTitle>
            </VisuallyHidden>
            <VisuallyHidden>
              <SheetDescription>
                Search through blog posts by title, description, or category.
              </SheetDescription>
            </VisuallyHidden>
          </SheetHeader>
          <>
            <div className="pb-4 pt-5 px-3">
              <button
                type="button"
                className="inline-block p-2"
                onClick={onClose}
              >
                <BackIcon />
              </button>
            </div>
            <SearchContent
              value={value}
              setValue={setValue}
              filteredArticles={filteredArticles}
              onClose={onClose}
            />
          </>
          <SheetFooter>
            <SheetClose asChild></SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop: Dialog
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "sm:max-w-174 max-w-[425px] p-0 rounded-[20px] space-y-0 gap-0 font-sans top-[20%]! translate-y-0 translate-x-[-50%]!",
          className,
        )}
      >
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
        <SearchContent
          value={value}
          setValue={setValue}
          filteredArticles={filteredArticles}
          onClose={onClose}
        />
        <DialogFooter>
          <DialogClose asChild></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
