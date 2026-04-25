import type { Activity } from "@/sanity/lib/types";

export function ActivityList({
  activities,
}: {
  activities?: Activity[] | null;
}) {
  if (!activities || activities.length === 0) {
    return <p className="text-sm text-muted">No activities logged yet.</p>;
  }
  const scrollable = activities.length > 4;
  return (
    <ul
      className={
        scrollable
          ? "max-h-80 divide-y divide-border overflow-y-auto pr-1"
          : "divide-y divide-border"
      }
    >
      {activities.map((a, i) => (
        <li
          key={`${a.title}-${i}`}
          className="flex flex-col gap-1 py-3 sm:flex-row sm:items-start sm:gap-4"
        >
          {a.time && (
            <span className="text-xs font-medium uppercase tracking-wide text-muted sm:w-20 sm:shrink-0 sm:text-sm sm:normal-case sm:tracking-normal">
              {a.time}
            </span>
          )}
          <div className="min-w-0">
            <p className="text-sm font-medium">{a.title}</p>
            {a.note && <p className="mt-0.5 text-sm text-muted">{a.note}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}
