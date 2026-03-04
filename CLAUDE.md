# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
Before you are doing any kind of changes to the code, make sure that we are running the latest code from GitHub.
You should always use Playwright MCP server to validate any kind of changes.
After a successful test, always push the changes to the GitHub repo.
When committing, use `git -c user.name="Sabik98" -c user.email="vanyasabadosh77@gmail.com" commit` to ensure the correct author.
To speed up the process in order to build complicated tasks, always use multiple agents in order to speed it up.
## Commands

- `npm run dev` — Start dev server (Next.js)
- `npm run build` — Production build (standalone output)
- `npm run lint` — Run ESLint via Next.js
- `npm start` — Start production server

## Architecture

This is a **Next.js 16** corporate website for Isella Group (isella-group.com) using the App Router with **next-intl** for i18n.

### Internationalization (i18n)

- **Locales**: `de` (default), `en`, `pl` — configured in `src/i18n/config.ts`
- **Locale prefix**: `as-needed` (no prefix for German, prefix for en/pl)
- **Localized pathnames**: Routes have per-locale slugs defined in both `src/middleware.ts` and `src/i18n/navigation.ts` (these must stay in sync)
- **Translation files**: `src/data/translations/{de,en,pl}.json` — all UI strings live here
- Use `useTranslations()` from next-intl in client components; `getTranslations()` in server components
- Use `Link` from `@/i18n/navigation` (not `next/link`) for locale-aware routing

### Routing Pattern

All pages live under `src/app/[locale]/`. Each page is a thin server component that renders a `*PageClient` component from `src/components/pages/`. This split keeps server/client boundaries clean.

### Styling

- **Tailwind CSS v4** with custom theme colors (`isella-blue`, `isella-orange`, etc.) defined in `tailwind.config.js`
- **Font**: Montserrat (loaded via `next/font/google`)
- Global styles in `src/styles/globals.css`

### Layout

Shared layout (`Navbar` + `Footer`) wraps all pages via `src/app/[locale]/layout.tsx`. The `NextIntlClientProvider` is set up there.
