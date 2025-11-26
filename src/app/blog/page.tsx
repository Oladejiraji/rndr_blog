import ArticleCard from "@/components/blog/article-card";
import { MailIcon, TwitterIcon } from "@/components/svg";
import { Categories } from "@/lib/constants";
import { getAllPosts } from "@/lib/mdx/server-functions";
import { cn } from "@/lib/utils";
import Link from "next/link";
import BlogSpotlight from "@/provider/spotlight";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles about motion design, React development, interactive components, and creative studio insights from RNDR Realm",
  openGraph: {
    title: "Blog | RNDR Realm",
    description:
      "Articles about motion design, React development, interactive components, and creative studio insights",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | RNDR Realm",
    description:
      "Articles about motion design, React development, interactive components, and creative studio insights",
  },
};

const socialOptions = [
  {
    icon: <TwitterIcon />,
    label: "Twitter (X)",
    href: "https://x.com/rndr_realm",
  },
  {
    icon: <MailIcon />,
    label: "Mail",
    href: "mailto:rndrrealm@gmail.com",
  },
];

const Blog = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string; q: string }>;
}) => {
  const { category = "all", q } = await searchParams;

  const ArticlesData = await getAllPosts();

  // Filter articles based on category and search query
  const filteredArticles = ArticlesData.filter((article) => {
    // Filter by category
    const matchesCategory = category === "all" || article.category === category;

    // Filter by search query
    const matchesSearch =
      !q ||
      article.title.toLowerCase().includes(q.toLowerCase()) ||
      article.description.toLowerCase().includes(q.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <div className="pt-10 pb-11 hidden md:block">
        <BlogSpotlight articleData={ArticlesData} />
      </div>
      <main className="px-5 md:px-0 max-w-174 mx-auto bg-background pt-5 md:pt-6 pb-20 border-b-2 border-gray-050 font-sans">
        <div>
          <div className="flex items-center justify-between pb-6">
            <div className="font-sans font-medium text-base ">
              <h2 className=" text-gray-900">rndr realm</h2>
              <h3 className="text-gray-600">Creative Studio</h3>
            </div>
            <div className=" md:hidden block">
              <BlogSpotlight articleData={ArticlesData} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {socialOptions.map((option, i) => (
              <Link
                key={i}
                href={option.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-gray-100 h-9 px-3.5 rounded-full gap-1"
              >
                {option.icon}
                <span className="text-gray-900 font-sans text-base ">
                  {option.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className="pt-20">
          <div className="flex items-center gap-2">
            {Categories.map((option, i) => {
              const searchParams = new URLSearchParams();
              if (option.value !== "all") {
                searchParams.set("category", option.value);
              }
              if (q) {
                searchParams.set("q", q);
              }
              const href =
                searchParams.toString() === ""
                  ? "/blog"
                  : `/blog?${searchParams.toString()}`;
              return (
                <Link
                  key={i}
                  href={href}
                  className="flex items-center bg-gray-100 h-9 px-3.5 rounded-full"
                >
                  <span
                    className={cn("text-gray-600 font-sans text-base ", {
                      "text-gray-900": category === option.value.toLowerCase(),
                    })}
                  >
                    {option.label}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="pt-6 flex flex-col gap-8">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article, i) => (
                <ArticleCard key={i} article={article} />
              ))
            ) : (
              <p className="text-gray-600 font-sans text-base">
                No articles found matching your search.
              </p>
            )}
          </div>
        </div>
      </main>

      <footer className="px-5 md:px-0 pt-8 max-w-174 mx-auto pb-20">
        <p className="font-sans font-medium text-base text-gray-900">
          Built in the realm
        </p>
      </footer>
    </>
  );
};

export default Blog;
