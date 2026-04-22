<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Onboarding

- **Stack:** Next.js 16 (App Router, React 19), Tailwind 4, Sanity v5, next-sanity.
- **Structure:** see `README.md` → Project structure.
- **Content model:** `dailySummary` (singleton), `blogPost`, `resourceCategory`, `resource`. Schemas in `sanity/schemaTypes/`.
- **Data access:** all GROQ lives in `sanity/lib/queries.ts` (wrapped in `defineQuery` so Sanity typegen picks them up). Pages and components fetch through helpers in `sanity/lib/fetch.ts`, which call the client and validate responses against Zod schemas in `sanity/lib/schemas.ts`. Generated types live in `sanity/lib/sanity.types.ts`; friendly aliases in `sanity/lib/types.ts`. Do not call `client.fetch` directly from pages — add a helper.
- **Regenerate types** after any schema or query change: `npm run sanity:typegen`.
- **Styling:** Tailwind utility classes inline. No CSS modules. No styled-components usage (pkg is a Sanity Studio peer dep).
- **Path alias:** `@/*` → repo root. Use it, not relative `../../`.

## Commands

| Command                  | Purpose                                       |
| ------------------------ | --------------------------------------------- |
| `npm run dev`            | Start Next dev server                         |
| `npm run build`          | Production build (requires Sanity env vars)   |
| `npm run lint`           | ESLint                                        |
| `npm run typecheck`      | `tsc --noEmit`                                |
| `npm run sanity:typegen` | Extract schema + regenerate `sanity.types.ts` |
| `npm run test`           | Vitest watch mode                             |
| `npm run test:run`       | Vitest single run (CI)                        |

## Conventions

- **Tests:** colocated under `__tests__/`, mirror source path (`__tests__/sanity/env.test.ts` → `sanity/env.ts`).
- **Server vs client components:** default to server. Add `"use client"` only when needed (event handlers, hooks).
- **Images:** always go through `urlFor()` from `sanity/lib/image.ts`. Never hardcode Sanity CDN URLs.
- **Env vars:** `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` required. `.env.example` lists them.
- **No auth, no mutations from frontend.** Content edits happen in Studio at `/studio`.

## Before committing

1. `npm run lint`
2. `npm run typecheck`
3. `npm run test:run`
4. `npm run build` if touching Next config, routes, or server components.

CI runs lint + typecheck + test + build on every PR (`.github/workflows/ci.yml`).

## Further reading

- `docs/agent-guide.md` — original execution handoff with full project history and decisions.
- `README.md` — stack, schema, scope decisions.
