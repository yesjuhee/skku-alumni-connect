# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

성균관대학교 총동창회 (Sungkyunkwan University Alumni Association) web application. Frontend-only React SPA with static mock data — no backend in this repository.

## Commands

- `npm run dev` — Start Vite dev server
- `npm run build` — Production build
- `npm run build:dev` — Development build
- `npm run lint` — ESLint
- `npm run test` — Run Vitest once
- `npm run test:watch` — Vitest in watch mode

## Tech Stack

- **React 18** + **TypeScript** (strict mode OFF in tsconfig)
- **Vite** build tool
- **React Router DOM v6** — nested routing with layout components
- **Tailwind CSS** + **shadcn/ui** (default style, CSS variables, `@/components/ui/*`)
- **TanStack React Query** — configured but not yet connected to real APIs
- **React Hook Form** + **Zod** — form handling and validation
- **Sonner** — toast notifications
- **Vitest** + **@testing-library/react** — unit tests
- **Playwright** — E2E tests

## Path Aliases

`@/*` maps to `./src/*` (configured in tsconfig and vite).

## Architecture

### Routing & Layouts

All routes are defined in `src/App.tsx`. Two layout components wrap page groups:

- **MainLayout** (`src/components/MainLayout.tsx`) — public-facing pages under `/main/*` with top nav + mobile bottom nav
- **AdminLayout** (`src/components/AdminLayout.tsx`) — admin pages under `/admin/*`

Standalone routes (landing, login, registration flow) have no shared layout.

### Key Route Groups

- `/` — Landing page
- `/login`, `/register/*` — Auth and multi-step registration flow
- `/main/*` — Member-facing pages (about, members, news, community, business, mypage, id-card, benefits)
- `/admin/*` — Admin dashboard and management pages (members, upload, applications, payments, news, community)

### Data Layer

Currently static — mock data lives in `src/data/` (members.ts, news.ts, community.ts). Client-side filtering, sorting, and search are implemented directly in page components. React Query is wired up but awaiting backend integration.

### UI Components

shadcn/ui components in `src/components/ui/`. Add new ones via `npx shadcn-ui@latest add <component>`. Configuration in `components.json`.

### Design Tokens

Custom color scheme defined as CSS variables in `src/index.css`. Primary color is green (HSL 145). Font: "Noto Sans KR". Dark mode supported via next-themes.

## Conventions

- All UI text is in Korean
- Components are functional with hooks
- Pages go in `src/pages/` (admin pages in `src/pages/admin/`)
- Reusable components go in `src/components/`
- Custom hooks go in `src/hooks/`
