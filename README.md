# Caregiver Dashboard

A small, polished demo showing how a caregiver-facing dashboard can be built on a modern headless CMS stack. Designed to be calm, readable, and easy to maintain.

## Stack

- **Next.js 16** (App Router, React 19 server components)
- **Tailwind CSS 4**
- **Sanity v5** content platform with embedded Studio at `/studio`
- **next-sanity** + `@sanity/image-url` for data + image helpers
- **@portabletext/react** for rich text rendering
- **Vercel** for deployment

## Project structure

```
app/
  page.tsx              daily summary dashboard (/)
  layout.tsx            root layout, global font + Sanity live config
  loading.tsx           global route-level loading fallback
  error.tsx             global error boundary
  not-found.tsx         global 404
  blog/
    page.tsx            blog index
    [slug]/page.tsx     blog detail with portable text
  resources/page.tsx    categorized resource library
  studio/[[...tool]]/   embedded Sanity Studio
components/             presentational building blocks
sanity/
  schemaTypes/          dailySummary, blogPost, resourceCategory, resource
  structure.ts          pins dailySummary as a singleton in Studio
  lib/
    client.ts           Sanity client
    image.ts            image URL builder
    queries.ts          GROQ queries (single source of truth)
    types.ts            shared content types
__tests__/              Vitest unit tests, mirror source paths
docs/                   long-form notes (agent-guide, etc.)
.github/workflows/      CI (lint + test + build on PR)
```

### Error handling conventions

Next.js App Router picks these up automatically:

- `app/loading.tsx` — shown while a segment is streaming.
- `app/error.tsx` — catches thrown errors in the subtree, client component with `reset()`.
- `app/not-found.tsx` — rendered when `notFound()` is called or no route matches.

Add scoped overrides inside a route directory (e.g. `app/blog/error.tsx`) only when that segment needs different behavior.

## Schema overview

| Type               | Purpose                                                 | Notes                                                    |
| ------------------ | ------------------------------------------------------- | -------------------------------------------------------- |
| `dailySummary`     | Homepage snapshot: name, photo, mood, activities, notes | Singleton — one document with fixed id `dailySummary`    |
| `blogPost`         | Caregiving articles                                     | Slug, published date, featured image, portable-text body |
| `resourceCategory` | Grouping for resources                                  | Title + slug + description                               |
| `resource`         | External link card                                      | References one `resourceCategory`                        |

### Why the content is modeled this way

- **`dailySummary` as a singleton** — the homepage represents one current snapshot. Using the Studio structure to pin a fixed document prevents duplicates and gives the editor a single obvious place to update today's content.
- **`resource` → `resourceCategory` reference** — categories are reusable and managed centrally. Editors cannot typo a category name, and renaming one updates every resource.
- **Portable Text for blog bodies** — structured rich text that renders to accessible React components, rather than raw HTML pasted from elsewhere.
- **Slug fields on posts and categories** — clean URLs and stable identifiers independent of title edits.

## Run locally

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000` (or `3001` if 3000 is busy). Studio is available at `/studio`.

Copy `.env.example` to `.env.local` and fill in values from your Sanity project:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=<your project id>
NEXT_PUBLIC_SANITY_DATASET=production
```

## Testing

```bash
npm run test      # watch mode
npm run test:run  # single run (what CI runs)
```

Tests live in `__tests__/` and mirror source paths. See `AGENTS.md` for conventions.

If Studio shows a CORS error, add the local origin:

```bash
npx sanity cors add http://localhost:3001 --credentials
```

## Deploy

Pushing to `main` auto-deploys to Vercel. In the Vercel project settings, set the same two public env vars as above. No server-side tokens are needed — all reads go through the public Sanity CDN.

## Intentional scope decisions

- **No authentication.** The brief is a demo; caregiver login would be backend work outside scope.
- **Read-only frontend.** Content is created and edited only in Studio.
- **One queries file.** All GROQ lives in `sanity/lib/queries.ts` to keep data access easy to audit.
- **`client.fetch` with ISR (`revalidate = 60`)** instead of live preview. Simpler to reason about and sufficient for a demo.
- **Minimal component library.** Shared primitives (`Container`, `DashboardCard`, `SectionHeader`, etc.) and nothing more. No design system abstractions that the four pages don't earn.
- **Calm visual language.** Off-white background, soft cards, muted accent. No gradients or animation beyond subtle hover.

## How Claude Code was used

- Scaffolding Sanity schemas and the singleton structure resolver
- Drafting GROQ queries and TypeScript types alongside them
- Generating the card/layout components and page compositions
- Verifying Next 16 route-handler changes (params as Promise) against local docs
