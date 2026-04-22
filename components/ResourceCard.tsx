import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";
import type { Resource } from "@/sanity/lib/types";

function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <a
      href={resource.externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col gap-3 rounded-3xl border border-border bg-card p-5 shadow-[0_1px_0_rgba(63,60,69,0.04),0_8px_24px_-16px_rgba(63,60,69,0.15)] transition-all hover:-translate-y-0.5 hover:border-accent-soft hover:shadow-[0_2px_0_rgba(63,60,69,0.04),0_16px_32px_-16px_rgba(63,60,69,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="flex items-start gap-3">
        {resource.thumbnail ? (
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-surface-rose">
            <Image
              src={urlFor(resource.thumbnail).width(80).height(80).url()}
              alt=""
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
        ) : (
          <div
            aria-hidden
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface-lavender text-muted"
          >
            <span className="font-mono text-[11px]">
              {resource.title.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
        <h3 className="text-base font-medium leading-snug tracking-tight text-foreground group-hover:text-accent-blue">
          {resource.title}
        </h3>
      </div>
      {resource.shortDescription && (
        <p className="text-sm leading-relaxed text-muted">
          {resource.shortDescription}
        </p>
      )}
      <div className="mt-auto flex items-center justify-between gap-3 pt-1">
        <span className="truncate font-mono text-[11px] uppercase tracking-wider text-muted">
          {hostname(resource.externalUrl)}
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-accent">
          Visit
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            fill="none"
            className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            <path
              d="M5 3.5h7.5V11M12 4L3.5 12.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </a>
  );
}
