export function ScrollHint({ label = "Scroll for more" }: { label?: string }) {
  return (
    <div
      aria-hidden
      className="mt-2 flex items-center justify-center gap-1.5 text-xs text-muted"
    >
      <span>{label}</span>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3.5 w-3.5 animate-bounce"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  );
}
