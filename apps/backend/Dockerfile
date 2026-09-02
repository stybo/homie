# Stage 1: Vite+ Workspace validation
FROM ghcr.io/voidzero-dev/vite-plus:latest AS builder
WORKDIR /app
COPY --chown=vp:vp package.json pnpm-lock.yaml pnpm-workspace.yaml .node-version* ./
RUN vp pm ci
COPY --chown=vp:vp apps/backend ./apps/backend

# Stage 2: Clean Alpine Runtime (~140 MB)
FROM node:alpine
WORKDIR /app

# Install ONLY backend production dependencies (express + dotenv = ~4MB)
COPY apps/backend/package.json ./
RUN npm install

# Copy backend source from builder
COPY --from=builder /app/apps/backend/src ./src

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

CMD ["node", "src/app.ts"]