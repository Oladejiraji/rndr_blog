import { getFileBySlug } from "@/lib/mdx/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import { rehypeFigure } from "@/lib/mdx/rehype-figure";
import { rehypeMeta } from "@/lib/mdx/rehype-meta";
import { rehypeSectionize } from "@/lib/mdx/rehype-sectionize-fork";
import Link from "next/link";
import { BackIcon, LinkIcon, MailIcon } from "@/components/svg";
import { MdxComponents } from "@/components/blog/mdx-components";
import { getAllPosts } from "@/lib/mdx/server-functions";
import BlogSpotlight from "@/provider/spotlight";
import type { Metadata } from "next";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo/structured-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getFileBySlug(resolvedParams.slug);
  const { frontMatter } = post;

  const publishedTime = frontMatter.date;
  const modifiedTime = frontMatter.updated || frontMatter.date;

  return {
    title: frontMatter.title,
    description: frontMatter.description,
    keywords: frontMatter.tags?.map((tag) => tag.label) || [],
    authors: [{ name: frontMatter.author }],
    openGraph: {
      title: frontMatter.title,
      description: frontMatter.description,
      type: "article",
      publishedTime,
      modifiedTime,
      authors: [frontMatter.author],
      tags: frontMatter.tags?.map((tag) => tag.label) || [],
      section: frontMatter.category,
    },
    twitter: {
      card: "summary_large_image",
      title: frontMatter.title,
      description: frontMatter.description,
    },
  };
}

export default async function RemoteMdxPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = await getFileBySlug(resolvedParams.slug);
  const articleData = await getAllPosts();

  const articleSchema = generateArticleSchema(
    post.frontMatter,
    post.frontMatter.readingTime.text,
    resolvedParams.slug
  );

  const breadcrumbSchema = generateBreadcrumbSchema(
    post.frontMatter.title,
    resolvedParams.slug
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <div className="pt-10 pb-11 hidden md:block">
        <BlogSpotlight articleData={articleData} />
      </div>
      <article className="px-5 md:px-0  max-w-174 mx-auto font-sans">
        <div className="py-7">
          <Link href="/blog" className="inline-block p-2">
            <BackIcon />
          </Link>
        </div>

        <header className="flex justify-between">
          <div className="font-medium text-base">
            <h3 className="text-gray-900 ">rndr realm</h3>
            <p className="text-gray-600">Creative Studio</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="mailto:rndrrealm@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="size-8 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <MailIcon />
            </Link>
            <Link
              href="mailto:rndrrealm@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="size-8 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <LinkIcon />
            </Link>
          </div>
        </header>

        <main className="pt-4 md:pt-20">
          <MDXRemote
            source={post.mdxSource}
            components={MdxComponents}
            options={{
              mdxOptions: {
                rehypePlugins: [
                  rehypeSlug,
                  rehypeSectionize,
                  rehypeMeta,
                  [
                    rehypeAutolinkHeadings,
                    {
                      behavior: "append",
                      properties: {
                        className: ["anchor-link", "space-window-top"],
                      },
                      content: {
                        type: "element",
                        tagName: "svg",
                        properties: {
                          xmlns: "http://www.w3.org/2000/svg",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          width: "16",
                          height: "16",
                          className: ["anchor-icon"],
                        },
                        children: [
                          {
                            type: "element",
                            tagName: "path",
                            properties: {
                              d: "M10 19.0004L9.82843 19.1719C8.26634 20.734 5.73368 20.734 4.17158 19.1719L3.82843 18.8288C2.26634 17.2667 2.26633 14.734 3.82843 13.1719L7.17158 9.8288C8.73368 8.2667 11.2663 8.2667 12.8284 9.8288L13.1716 10.1719C13.8252 10.8256 14.2053 11.6491 14.312 12.5004",
                              stroke: "currentColor",
                              strokeWidth: "2",
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                            },
                            children: [],
                          },
                          {
                            type: "element",
                            tagName: "path",
                            properties: {
                              d: "M9.68799 12.5004C9.79463 13.3516 10.1748 14.1752 10.8284 14.8288L11.1715 15.1719C12.7336 16.734 15.2663 16.734 16.8284 15.1719L20.1715 11.8288C21.7336 10.2667 21.7336 7.73404 20.1715 6.17194L19.8284 5.8288C18.2663 4.2667 15.7336 4.2667 14.1715 5.8288L14 6.00037",
                              stroke: "currentColor",
                              strokeWidth: "2",
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                            },
                            children: [],
                          },
                        ],
                      },
                    },
                  ],
                  rehypeFigure,
                ],
              },
            }}
          />
        </main>
        <footer className="pt-8 mt-20  pb-20 border-t-2 border-gray-050 ">
          <h3 className="text-gray-900 font-medium textsm md:text-xl pb-2">
            Continue this discussion
          </h3>
          <p className="font-sans text-xs md:text-base text-gray-900">
            We&apos;re always happy to speak to people about the work we do at
            the realm, reach out to us on rndrrealm@gmail.com, looking forward
            to our conversation.
          </p>
        </footer>
      </article>
    </>
  );
}
