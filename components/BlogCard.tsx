import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";
import type { BlogPostSummary } from "@/sanity/lib/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function BlogCard({ post }: { post: BlogPostSummary }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-[0_1px_0_rgba(63,60,69,0.04),0_8px_24px_-16px_rgba(63,60,69,0.15)] transition-all hover:-translate-y-0.5 hover:shadow-[0_2px_0_rgba(63,60,69,0.04),0_16px_32px_-16px_rgba(63,60,69,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {post.featuredImage ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-rose">
          <Image
            src={urlFor(post.featuredImage).width(800).height(450).url()}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-surface-rose via-surface-lavender to-surface-sky">
          <div
            aria-hidden
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, var(--accent-soft) 0%, transparent 40%), radial-gradient(circle at 80% 70%, var(--accent-blue) 0%, transparent 40%)",
            }}
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="eyebrow">
          {[post.author, formatDate(post.publishedAt)]
            .filter(Boolean)
            .join(" · ")}
        </p>
        <h3 className="text-lg font-medium leading-snug tracking-tight text-foreground group-hover:text-accent-blue">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="line-clamp-3 text-sm leading-relaxed text-muted">
            {post.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
