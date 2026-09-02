# Build stage
FROM ghcr.io/voidzero-dev/vite-plus:latest AS build
WORKDIR /app
COPY --chown=vp:vp package.json pnpm-lock.yaml pnpm-workspace.yaml .node-version* ./
RUN vp pm ci
COPY --chown=vp:vp . .
RUN vp -C apps/frontend build

# Production stage
FROM nginx:alpine
COPY --from=build /app/apps/frontend/dist /usr/share/nginx/html
RUN cat <<'EOF' > /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]