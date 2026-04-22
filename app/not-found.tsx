import Link from "next/link";

import { Container } from "@/components/Container";
import { DashboardCard } from "@/components/DashboardCard";

export default function NotFound() {
  return (
    <Container>
      <DashboardCard>
        <p className="eyebrow">404</p>
        <h1 className="mt-2 text-2xl font-medium tracking-tight">
          Page not found
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Back to dashboard
        </Link>
      </DashboardCard>
    </Container>
  );
}
