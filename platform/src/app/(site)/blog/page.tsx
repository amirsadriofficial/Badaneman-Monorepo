"use client";

import { useMemo, useState } from "react";
import { blogPosts } from "@/lib/mock-data";
import { Badge, Card, CardContent, SectionTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { common } from "@/lib/locale/fa";
import Link from "next/link";

export default function BlogPage() {
  const [category, setCategory] = useState("همه");
  const categories = useMemo(() => ["همه", ...new Set(blogPosts.map((p) => p.category))], []);

  const filtered = useMemo(() => {
    return blogPosts.filter((p) => category === "همه" || p.category === category);
  }, [category]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionTitle title="وبلاگ" subtitle="مقالات تمرین، تغذیه و سلامت" />

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              category === cat
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground">{common.empty}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <Card key={post.id} className="transition-colors hover:border-primary/50">
              <div className="flex aspect-video items-center justify-center bg-muted text-muted-foreground">
                📝
              </div>
              <CardContent>
                <Badge className="bg-primary/10 text-primary">{post.category}</Badge>
                <h3 className="mt-2 font-semibold">{post.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{post.author}</span>
                  <span>{formatDate(post.date)}</span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 block text-sm text-primary hover:underline"
                >
                  {common.readMore}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
