import { BlogCard } from "@/components/BlogCard";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { getAllPosts } from "@/sanity/lib/fetch";

export const revalidate = 60;

export const metadata = {
  title: "Blog — Caregiver Dashboard",
  description: "Reflections and practical guidance for caregivers.",
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <Container className="flex flex-col gap-6">
      <SectionHeader
        eyebrow="Blog"
        title="Caregiving notes"
        description="Short reads from caregivers and clinicians."
      />
      {posts.length === 0 ? (
        <p className="text-sm text-muted">No posts published yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </Container>
  );
}
