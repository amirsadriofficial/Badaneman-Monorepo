import type { MetadataRoute } from "next";
import { blogPosts, products } from "@/lib/mock-data";

const baseUrl = "https://badaneman.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "", "/membership", "/reservations", "/store", "/recruitment",
    "/blog", "/faq", "/consultation", "/tour/gallery", "/tour/videos",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const blogPages = blogPosts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const productPages = products.map((p) => ({
    url: `${baseUrl}/store/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages, ...productPages];
}
