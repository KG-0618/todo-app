# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` or `pnpm dev`
- **Build**: `npm run build` or `pnpm build` (runs TypeScript compiler first, then Vite build)
- **Lint**: `npm run lint` or `pnpm lint` (ESLint with TypeScript rules)
- **Preview build**: `npm run preview` or `pnpm preview`

## Project Architecture

This is a mobile-first ToDo application built with React + TypeScript + Vite. The project uses a modern stack focused on simplicity and performance.

### Tech Stack
- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Icons**: Lucide React
- **Data**: Local Storage (no external APIs)
- **Architecture**: Component-based with custom hooks for state management

### Directory Structure
```
src/
├── components/
│   └── ui/           # shadcn/ui components (Button, etc.)
├── lib/
│   └── utils.ts      # Utility functions (cn helper for class merging)
├── assets/           # Static assets
├── App.tsx           # Main application component
└── main.tsx          # Application entry point
```

### Path Alias
- `@/*` maps to `./src/*` (configured in vite.config.ts and tsconfig.json)

### Project Goals
According to design documents, this is planned as a progressive ToDo app with:
1. **Phase 1**: Basic CRUD operations, local storage, mobile-optimized UI
2. **Phase 2**: Categories, search/filter, priority levels, due dates

### Current State
The project currently contains a basic Vite + React starter template. The actual ToDo application components and functionality are not yet implemented based on the design specifications in `design-doc.md` and `requirements-doc.md`.

### Design Principles
- Mobile-first responsive design
- Japanese language support (design docs are in Japanese)
- Local storage for data persistence
- No external API dependencies
- Smooth animations (60fps target)
- Dark mode support

### Component Patterns
- Uses shadcn/ui component library with class-variance-authority for styling variants
- Utility-first approach with Tailwind CSS
- Custom hooks pattern for state management (planned: `useTodos`, `useLocalStorage`)

### Development Notes
- ESLint configured with TypeScript and React rules
- Tailwind CSS v4 with Vite plugin
- Path resolution configured for `@/` imports