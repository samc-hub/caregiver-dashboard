"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import { ScrollHint } from "@/components/ScrollHint";

export function ScrollableUl({
  children,
  className,
  scrollable,
}: {
  children: ReactNode;
  className: string;
  scrollable: boolean;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    if (!scrollable) return;
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
      setAtBottom(distance < 8);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [scrollable]);

  return (
    <>
      <ul
        ref={ref}
        className={
          scrollable
            ? `${className} [mask-image:linear-gradient(to_bottom,black_calc(100%-1.5rem),transparent)]`
            : className
        }
      >
        {children}
      </ul>
      {scrollable && (
        <div className={atBottom ? "invisible" : undefined}>
          <ScrollHint />
        </div>
      )}
    </>
  );
}
