# syntax=docker/dockerfile:1

# --- build stage: the official Vite+ toolchain image ---
FROM ghcr.io/voidzero-dev/vite-plus:latest AS build
WORKDIR /app

# Install dependencies first so this layer is cached across source changes.
COPY --chown=vp:vp package.json pnpm-lock.yaml pnpm-workspace.yaml .node-version* ./
RUN --mount=type=secret,id=HEROUI_AUTH_TOKEN,env=HEROUI_AUTH_TOKEN,required=false vp install --frozen-lockfile

# Build. vp reads .node-version and provisions that exact Node.js automatically.
COPY --chown=vp:vp . .
RUN vp build

# --- runtime stage: official slim Node runtime with matching .node-version ---
FROM node:26-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV NITRO_PORT=8080

# Standalone Nitro server output (fully self-contained, no node_modules required)
COPY --from=build /app/.output ./.output

USER node
EXPOSE 8080
CMD ["node", ".output/server/index.mjs"]
