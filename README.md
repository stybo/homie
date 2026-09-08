# Homie

![Homelab Dashboard Banner](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80)

A modern homelab monitoring dashboard built on a [Vite+](https://github.com/voidzero-dev/vite-plus) monorepo.

## Structure

```text
├── apps/
│   ├── frontend/    # React 19, HeroUI, TanStack Router & Query, Tailwind CSS v4
│   └── backend/     # Express API proxying Proxmox VE RRD metrics
├── packages/
│   └── types/       # Shared TypeScript schemas & Proxmox types (@homie/types)
└── tools/           # Oxlint anti-slop rules & dev tooling
```

## Quick Start

### Prerequisites

- [pnpm](https://pnpm.io/) `v12+`
- [Vite+](https://github.com/voidzero-dev/vite-plus) CLI (`vp`)

### Development

```bash
# Install dependencies
pnpm install

# Start all applications in parallel
vp run dev
```

### Quality & Build

```bash
# Typecheck, lint & format
vp check --fix

# Build all apps & packages
vp run -r build
```

## Docker Deployment

Configure environment variables in `apps/backend/.env`:

```env
PROXMOX_TOKEN=PVEAPIToken=user@realm!tokenid=uuid
```

Run with Docker Compose:

```bash
docker compose up -d --build
```

- **Frontend**: `http://localhost:8080`
- **Backend API**: `http://localhost:10000/api/health`
