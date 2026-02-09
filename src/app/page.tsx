import ArticleCard from "@/components/blog/article-card";
import { Categories } from "@/lib/constants";
import { getAllPosts } from "@/lib/mdx/server-functions";
import { cn } from "@/lib/utils";
import Link from "next/link";
import BlogSpotlight from "@/provider/spotlight";
import type { Metadata } from "next";
import { RiveAnimation } from "@/components/RiveAnimation";
import GithubLink from "@/components/blog/links/github";
import EmailLInk from "@/components/blog/links/email";
import TwitterLink from "@/components/blog/links/twitter";
export const metadata: Metadata = {
  title: "Blog | RNDR Realm",
  description:
    "Articles about motion design, interactive components, and creative studio insights from RNDR Realm",
  openGraph: {
    title: "Blog | RNDR Realm",
    description:
      "Articles about motion design, interactive components, and creative studio insights",
    type: "website",
    images: [
      {
        url: "/og2.png",
        width: 1200,
        height: 630,
        alt: "RNDR Realm Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | RNDR Realm",
    description:
      "Articles about motion design, interactive components, and creative studio insights",
    images: ["/og2.png"],
  },
};

const socialOptions = [
  {
    icon: (
      <RiveAnimation
        src="/twitter.riv"
        stateMachineName="Twitter"
        className="w-full h-9"
      />
    ),
    label: "Twitter (X)",
    href: "https://x.com/rndr_realm",
  },
  {
    icon: (
      <RiveAnimation
        src="/mail.riv"
        stateMachineName="Mail"
        className="w-full h-9"
      />
    ),
    label: "Mail",
    href: "mailto:hello@rndrealm.com",
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
      {/* <div className="pt-10 pb-11 hidden md:block">
        <BlogSpotlight articleData={ArticlesData} />
      </div> */}
      <main className="px-5 md:px-0 max-w-137.5 mx-auto bg-background pt-5 md:pt-20 pb-20 border-b-2 border-gray-050 font-sans">
        <div>
          <div className="flex items-center justify-between pb-6">
            <div className="font-sans font-medium text-sm leading-5 ">
              <Link
                href="https://rndrealm.com/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <h2 className=" text-gray-900">rndr realm</h2>
              </Link>
              <h3 className="text-gray-1300 opacity-40">Creative Studio</h3>
            </div>
            {/* <div className=" md:hidden block">
              <BlogSpotlight articleData={ArticlesData} isMobile />
            </div> */}
          </div>
          <div className="flex items-center gap-2">
            <TwitterLink />
            <GithubLink />
            <EmailLInk />
          </div>
        </div>
        <div className="pt-8">
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
                  ? "/"
                  : `?${searchParams.toString()}`;
              return (
                <Link
                  key={i}
                  href={href}
                  className="flex items-center bg-gray-100 h-10 px-3.5 rounded-full"
                >
                  <span
                    className={cn(
                      "text-gray-900 opacity-40 font-medium font-sans text-sm ",
                      {
                        "text-gray-900 opacity-100":
                          category === option.value.toLowerCase(),
                      },
                    )}
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

      <footer className="px-5 md:px-0 pt-8 max-w-137.5 mx-auto pb-20">
        <p className="font-sans font-medium text-base text-gray-900">
          Built in the{" "}
          <Link
            href="https://rndrealm.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <span className="underline">realm</span>
          </Link>
        </p>
      </footer>
    </>
  );
};

export default Blog;
