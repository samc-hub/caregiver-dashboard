import type { ReactNode } from "react";

export function DashboardCard({
  children,
  className = "",
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "soft";
}) {
  const toneClasses = tone === "soft" ? "bg-surface-muted" : "bg-card";
  return (
    <section
      className={`rounded-3xl border border-border p-6 shadow-[0_1px_0_rgba(63,60,69,0.04),0_8px_24px_-12px_rgba(63,60,69,0.12)] sm:p-7 ${toneClasses} ${className}`}
    >
      {children}
    </section>
  );
}
