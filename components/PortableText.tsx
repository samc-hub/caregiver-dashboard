import {
  PortableText as BasePortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-6">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-border">
            <Image
              src={urlFor(value).width(1200).height(675).url()}
              alt={value.alt ?? ""}
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover"
            />
          </div>
          {value.alt && (
            <figcaption className="mt-2 text-xs text-muted">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 text-xl font-medium tracking-tight text-foreground sm:text-2xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-lg font-medium tracking-tight text-foreground">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="mt-4 text-[17px] leading-[1.7] text-foreground/90">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 rounded-r-lg border-l-2 border-accent-soft bg-surface-lavender/60 px-5 py-3 italic text-foreground">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline underline-offset-2 hover:text-accent-blue"
      >
        {children}
      </a>
    ),
  },
};

export function PortableText({
  value,
}: {
  value: Parameters<typeof BasePortableText>[0]["value"];
}) {
  return <BasePortableText value={value} components={components} />;
}
