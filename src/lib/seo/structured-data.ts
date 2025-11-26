import { Post } from "@/types/post";

export function generateArticleSchema(
  post: Post,
  readingTime: string,
  slug: string
) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "RNDR Realm",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${slug}`,
    },
    timeRequired: readingTime,
    articleSection: post.category,
    keywords: post.tags?.map((tag) => tag.label).join(", ") || "",
    inLanguage: "en-US",
  };
}

export function generateBreadcrumbSchema(
  title: string,
  slug: string
) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${baseUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `${baseUrl}/blog/${slug}`,
      },
    ],
  };
}

export function generateOrganizationSchema() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "RNDR Realm",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    sameAs: [
      "https://x.com/rndr_realm",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "rndrrealm@gmail.com",
      contactType: "Customer Service",
    },
  };
}
