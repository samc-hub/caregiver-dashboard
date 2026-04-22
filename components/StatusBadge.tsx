import type { MoodStatus } from "@/sanity/lib/types";

const STYLES: Record<
  MoodStatus,
  { label: string; classes: string; dot: string }
> = {
  calm: {
    label: "Calm",
    classes: "bg-[#eafeff] text-[#0b5c4d] ring-[#9fc0d4]/60",
    dot: "bg-[#117143]",
  },
  restless: {
    label: "Restless",
    classes: "bg-[#f5eded] text-[#7a3b42] ring-[#e8c3c8]",
    dot: "bg-[#c26a73]",
  },
  engaged: {
    label: "Engaged",
    classes: "bg-[#f2ecff] text-[#4b3a7a] ring-[#b49fe3]/60",
    dot: "bg-[#7158a2]",
  },
  sleeping: {
    label: "Sleeping",
    classes: "bg-[#eef2e6] text-[#3a4a1a] ring-[#c9d4b0]",
    dot: "bg-[#5a6b2e]",
  },
};

export function StatusBadge({ status }: { status?: MoodStatus | null }) {
  if (!status) return null;
  const meta = STYLES[status];
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${meta.classes}`}
    >
      <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
      {meta.label}
    </span>
  );
}
