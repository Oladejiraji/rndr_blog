import { getAllPosts } from "@/lib/mdx/server-functions";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const posts = await getAllPosts();

  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/${post.slug}`,
    lastModified: post.updated || post.date,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...blogPosts,
  ];
}
