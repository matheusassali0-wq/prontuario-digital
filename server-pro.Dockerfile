# syntax=docker/dockerfile:1
FROM node:20-alpine
WORKDIR /workspace
ENV TZ=America/Sao_Paulo NODE_ENV=development
# Prefer bind mounts in dev; keep image slim
COPY package.json pnpm-lock.yaml* package-lock.json* yarn.lock* ./
RUN npm i -g pnpm >/dev/null 2>&1 || true
RUN apk add --no-cache curl >/dev/null 2>&1 || true
RUN if [ -f package-lock.json ]; then npm ci --no-fund --no-audit || true; elif [ -f pnpm-lock.yaml ]; then pnpm i --frozen-lockfile || pnpm i; elif [ -f yarn.lock ]; then yarn install || true; else npm i || true; fi
COPY . .
EXPOSE 3030 9229
CMD ["node","--inspect=0.0.0.0:9229","server/server-pro.cjs"]
