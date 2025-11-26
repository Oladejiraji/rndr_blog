import ArticleTag from "@/components/blog/article-tag";
import { ArticleIcon, FeaturedIcon } from "@/components/svg";

export const ArticlesData = [
  {
    id: 1,
    tags: [
      <ArticleTag
        key={1}
        label="Article"
        icon={<ArticleIcon fill="#70BB9C" />}
        textColor="#70BB9C"
        bgColor="#E8F7F0"
      />,
      <ArticleTag
        key={2}
        label="Featured"
        icon={<FeaturedIcon fill="#5F8DBE" />}
        textColor="#5F8DBE"
        bgColor="#EAF2FF"
      />,
    ],
    href: "/blog/intro",
    title: "Why we decided to write.",
    description:
      "We don’t know, but we’re doing our best to document our process.",
    category: "the-studio",
  },
  {
    id: 2,
    tags: [
      <ArticleTag
        key={1}
        label="Article"
        icon={<ArticleIcon fill="#70BB9C" />}
        textColor="#70BB9C"
        bgColor="#E8F7F0"
      />,
      <ArticleTag
        key={2}
        label="Featured"
        icon={<FeaturedIcon fill="#5F8DBE" />}
        textColor="#5F8DBE"
        bgColor="#EAF2FF"
      />,
    ],
    href: "/blog/intro",
    title: "How to develop taste",
    description:
      "Developing taste is a journey, not a destination. Here’s how we approach it.",
    category: "the-studio",
  },
  {
    id: 3,
    tags: [
      <ArticleTag
        key={1}
        label="Article"
        icon={<ArticleIcon fill="#70BB9C" />}
        textColor="#70BB9C"
        bgColor="#E8F7F0"
      />,
      <ArticleTag
        key={2}
        label="Featured"
        icon={<FeaturedIcon fill="#5F8DBE" />}
        textColor="#5F8DBE"
        bgColor="#EAF2FF"
      />,
    ],
    href: "/blog/intro",
    title: "How to master layout animations",
    description:
      "Layout animations can be tricky, but with these tips, you’ll be a pro in no time.",
    category: "motion",
  },
];

export type Article = (typeof ArticlesData)[0];

export const Categories = [
  {
    label: "All",
    value: "all",
    link: "/blog",
  },
  {
    label: "Motion",
    value: "motion",
    link: "/blog?category=motion",
  },

  {
    label: "The Studio",
    value: "the-studio",
    link: "/blog?category=the-studio",
  },
];
