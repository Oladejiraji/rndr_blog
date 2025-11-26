export type PrePropsType = {
  children?: React.ReactNode;
};

export interface PostType {
  title: string;
  description: string;
  date: string;
  updated: string;
  author: string;
  slug: string;
  category: string;
  published: boolean;
  tags: {
    label: string;
    iconFill: string;
    textColor: string;
    bgColor: string;
    type: "featured" | "article";
  }[];
}
