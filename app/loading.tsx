import { Container } from "@/components/Container";

export default function Loading() {
  return (
    <Container className="flex flex-col gap-8">
      <div className="h-40 animate-pulse rounded-3xl border border-border bg-card" />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="h-48 animate-pulse rounded-3xl border border-border bg-card" />
        <div className="h-48 animate-pulse rounded-3xl border border-border bg-surface-muted" />
      </div>
    </Container>
  );
}
