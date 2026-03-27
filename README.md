# Mikey D's Encylopedia De Musique

An interactive visualization of the history and genealogy of electronic music genres. Explore how different electronic music styles evolved, influenced each other, and shaped modern music from the 1940s to today.

## Overview

Electronic Music Tree is a web application that presents the complex relationships between electronic music genres in an intuitive, visual tree format. Each genre node displays comprehensive information including:

- **Historical Context** – Year of origin and decade
- **Description** – Detailed explanation of the genre's characteristics and philosophy
- **Key Artists** – Pioneering musicians and their contributions
- **Essential Tracks** – Iconic songs and links to listen
- **Musical Characteristics** – Defining features and techniques

The application features a beautiful shader-based animated background and a responsive sidebar interface for detailed genre exploration.

## Main Technologies

### Frontend
- **React 19** – UI component framework
- **TypeScript** – Type-safe JavaScript
- **Vite** – Fast build tool and dev server
- **React Router** – Client-side routing
- **TanStack React Query** – Server state management

### Styling & UI
- **Tailwind CSS** – Utility-first CSS framework  
- **shadcn/ui (Radix UI)** – Accessible component library
- **WebGL (Custom Shaders)** – Animated background effects

### Testing & Quality
- **Vitest** – Fast unit test framework
- **Playwright** – End-to-end testing
- **ESLint** – Code linting

## How It Works

### Directory Structure

```
src/
├── components/
│   ├── GenreTree.tsx          # Main tree visualization
│   ├── GenreNode.tsx          # Individual genre node
│   ├── GenreInfoSidebar.tsx   # Genre detail panel
│   ├── ShaderBackground.tsx   # Animated WebGL background
│   └── ui/                    # Reusable UI components (shadcn)
├── data/
│   └── genreData.ts           # Genre hierarchy and metadata
├── pages/
│   ├── Index.tsx              # Main page
│   └── NotFound.tsx           # 404 page
└── hooks/                     # Custom React hooks
```

### Core Features

1. **Interactive Genre Tree** – Click on genre nodes to explore relationships and view details
2. **Genre Information Panel** – Displays comprehensive data about selected genres
3. **Visual Hierarchy** – Tree layout shows parent-child relationships between genres
4. **Color Coding** – Each genre has a distinct color for visual identification
5. **Responsive Design** – Works on desktop and tablet devices

### Data Model

Genres are defined with the following properties:
- `id` – Unique identifier
- `name` – Genre name
- `year` / `decade` – Historical timeline
- `color` – Visual identifier
- `parents` – Related parent genres
- `description` – Detailed text
- `characteristics` – Key musical features
- `artists` – Notable musicians
- `tracks` – Essential listening with YouTube links

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (or npm/yarn)

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Starts the dev server at `http://localhost:5173`

### Building

```bash
pnpm build
```

Creates an optimized production build in the `dist/` directory

### Testing

```bash
# Unit tests
pnpm test

# Watch mode
pnpm test:watch

# E2E tests
pnpm exec playwright test
```

### Linting

```bash
pnpm lint
```

## Project Architecture

The application uses a component-based architecture with clear separation of concerns:

- **Data Layer** – Genre data is centralized in `genreData.ts`
- **Presentation Layer** – Components handle rendering and user interaction
- **Layout** – Tree visualization with responsive sidebar sidebar UI
- **Effects** – Shader background runs independently for visual appeal

