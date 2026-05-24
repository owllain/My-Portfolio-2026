# My Portfolio 2026

Personal portfolio website built with Next.js, Tailwind CSS, shadcn/ui, Prisma, and React Three Fiber.

## Overview

This project is a modern portfolio site with:

- Hero section, about, skills, projects, and contact sections
- 3D scene and animated pixel visuals
- Custom UI components using `shadcn/ui`
- API routes for contact and GitHub integration
- Prisma setup for database operations
- Localization and theme handling

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Prisma
- Bun (project scripts use Bun)

## Getting started

1. Copy environment variables into a local `.env` file.
2. Install dependencies:
   ```bash
   bun install
   ```
3. Run development server:
   ```bash
   bun dev
   ```
4. Build for production:
   ```bash
   bun build
   ```
5. Start production server:
   ```bash
   bun start
   ```

## Project structure

- `src/app` — app routes, layout and main page
- `src/components/portfolio` — portfolio page sections and visuals
- `src/components/ui` — shared UI primitives
- `src/lib` — utilities and database client
- `prisma` — Prisma schema and migrations
- `public` — static assets, models and images

## Notes

- `.env` is intentionally excluded from the repository.
- If you use `npm` or `pnpm`, update the commands accordingly.

## GitHub

Repository remote URL: `https://github.com/owllain/My-Portfolio-2026.git`
