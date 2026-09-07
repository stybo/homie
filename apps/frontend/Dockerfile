# Build stage
FROM ghcr.io/voidzero-dev/vite-plus:latest AS build
WORKDIR /app
COPY --chown=vp:vp package.json pnpm-lock.yaml pnpm-workspace.yaml .node-version* ./
RUN --mount=type=secret,id=HEROUI_AUTH_TOKEN,env=HEROUI_AUTH_TOKEN
RUN vp pm ci
COPY --chown=vp:vp . .
RUN vp -C apps/frontend build

# Production stage
FROM nginx:alpine
COPY --from=build /app/apps/frontend/dist /usr/share/nginx/html
COPY apps/frontend/.nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]