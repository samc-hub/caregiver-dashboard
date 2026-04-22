import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/Container";
import { PortableText } from "@/components/PortableText";
import { getPostBySlug, getPostSlugs } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const slugs = await getPostSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <Container className="max-w-3xl">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 rounded-md text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        ← Back to blog
      </Link>
      <article className="mt-6">
        <header className="border-b border-border pb-8">
          <h1 className="text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>
          <p className="eyebrow mt-4">
            {[post.author, formatDate(post.publishedAt)]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </header>
        {post.featuredImage && (
          <div className="relative my-6 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-border">
            <Image
              src={urlFor(post.featuredImage).width(1200).height(675).url()}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover"
              priority
            />
          </div>
        )}
        {post.excerpt && (
          <p className="text-lg leading-relaxed text-muted">{post.excerpt}</p>
        )}
        {post.body && (
          <div className="mt-4">
            <PortableText value={post.body} />
          </div>
        )}
      </article>
    </Container>
  );
}
