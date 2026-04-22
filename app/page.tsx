import Image from "next/image";

import { ActivityList } from "@/components/ActivityList";
import { Container } from "@/components/Container";
import { DashboardCard } from "@/components/DashboardCard";
import { HeroBackground } from "@/components/HeroBackground";
import { SectionHeader } from "@/components/SectionHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { getDailySummary } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60;

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function initials(name: string) {
  return name
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default async function HomePage() {
  const summary = await getDailySummary();

  if (!summary) {
    return (
      <Container>
        <DashboardCard>
          <h1 className="text-xl font-medium">Daily summary not set up yet</h1>
          <p className="mt-2 text-sm text-muted">
            Open{" "}
            <code className="rounded bg-border px-1.5 py-0.5 font-mono text-xs">
              /studio
            </code>{" "}
            and fill in the Daily Summary document.
          </p>
        </DashboardCard>
      </Container>
    );
  }

  return (
    <Container className="flex flex-col gap-8">
      <DashboardCard className="relative overflow-hidden">
        <HeroBackground />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
          {summary.photo ? (
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-border ring-1 ring-border">
              <Image
                src={urlFor(summary.photo).width(192).height(192).url()}
                alt={summary.careRecipientName}
                fill
                sizes="96px"
                className="object-cover"
                priority
                fetchPriority="high"
              />
            </div>
          ) : (
            <div
              aria-hidden
              className="grid h-24 w-24 shrink-0 place-items-center rounded-2xl bg-surface-lavender font-mono text-2xl text-muted ring-1 ring-border"
            >
              {initials(summary.careRecipientName)}
            </div>
          )}
          <div className="flex-1">
            <p className="eyebrow">{greeting()}</p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-medium tracking-tight text-foreground">
                {summary.careRecipientName}
              </h1>
              <StatusBadge status={summary.moodStatus} />
            </div>
            {summary.relationship && (
              <p className="mt-1 text-sm text-muted">{summary.relationship}</p>
            )}
            {summary.shortSummary && (
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-foreground/90">
                {summary.shortSummary}
              </p>
            )}
          </div>
        </div>
      </DashboardCard>

      <div className="grid gap-6 md:grid-cols-2">
        <DashboardCard>
          <SectionHeader eyebrow="Today" title="Recent activity" />
          <ActivityList activities={summary.activities} />
        </DashboardCard>

        <DashboardCard tone="soft">
          <SectionHeader eyebrow="Watch for" title="Notes & flags" />
          {summary.notesOrFlags && summary.notesOrFlags.length > 0 ? (
            <ul className="space-y-2">
              {summary.notesOrFlags.map((note, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-xl bg-card px-4 py-3 text-sm leading-relaxed text-foreground ring-1 ring-inset ring-border"
                >
                  <span
                    aria-hidden
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-soft"
                  />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted">Nothing flagged for today.</p>
          )}
        </DashboardCard>
      </div>
    </Container>
  );
}
