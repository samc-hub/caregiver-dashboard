"use client";

import { Container } from "@/components/Container";
import { DashboardCard } from "@/components/DashboardCard";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container>
      <DashboardCard tone="soft">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="mt-2 text-2xl font-medium tracking-tight">
          We couldn&apos;t load this page
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {error.message || "An unexpected error occurred."}
          {error.digest && (
            <span className="ml-1 font-mono text-xs">({error.digest})</span>
          )}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex items-center rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Try again
        </button>
      </DashboardCard>
    </Container>
  );
}
