# Build stage
FROM ghcr.io/voidzero-dev/vite-plus:latest AS build
WORKDIR /app
COPY --chown=vp:vp package.json pnpm-lock.yaml pnpm-workspace.yaml .node-version* ./
COPY --chown=vp:vp apps/backend/package.json ./apps/backend/
COPY --chown=vp:vp packages/types/package.json ./packages/types/
RUN vp pm ci
COPY --chown=vp:vp . .
RUN vp -C apps/backend build

# Production stage
FROM node:22-alpine
WORKDIR /app
COPY --from=build /app/apps/backend/dist ./dist
EXPOSE 10000
CMD ["node", "dist/app.js"]
