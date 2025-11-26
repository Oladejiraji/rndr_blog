import { ArticleIcon, FeaturedIcon } from "@/components/svg";

export const iconMap = {
  article: (fill: string) => <ArticleIcon fill={fill} />,
  featured: (fill: string) => <FeaturedIcon fill={fill} />,
} as const;

export type IconType = keyof typeof iconMap;
