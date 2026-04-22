import { Container } from "@/components/Container";
import { ResourceCard } from "@/components/ResourceCard";
import { SectionHeader } from "@/components/SectionHeader";
import { getResourcesByCategory } from "@/sanity/lib/fetch";

export const revalidate = 60;

export const metadata = {
  title: "Resources — Caregiver Dashboard",
  description: "Curated support resources for caregivers.",
};

export default async function ResourcesPage() {
  const categories = await getResourcesByCategory();

  const populated = categories.filter((c) => c.resources.length > 0);

  return (
    <Container className="flex flex-col gap-10">
      <SectionHeader
        eyebrow="Resources"
        title="Support library"
        description="Trusted links, grouped by what you might need today."
      />

      {populated.length === 0 ? (
        <p className="text-sm text-muted">No resources published yet.</p>
      ) : (
        <>
          <nav className="flex flex-wrap gap-2">
            {populated.map((c) => (
              <a
                key={c._id}
                href={`#${c.slug}`}
                className="rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted transition-colors hover:border-accent-soft hover:bg-surface-lavender/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {c.title}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-12">
            {populated.map((category) => (
              <section
                key={category._id}
                id={category.slug}
                className="scroll-mt-24"
              >
                <div className="mb-5">
                  <h2 className="text-2xl font-medium tracking-tight text-foreground">
                    {category.title}
                  </h2>
                  {category.description && (
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                      {category.description}
                    </p>
                  )}
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {category.resources.map((r) => (
                    <ResourceCard key={r._id} resource={r} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </>
      )}
    </Container>
  );
}
