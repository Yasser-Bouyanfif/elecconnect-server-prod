# syntax=docker/dockerfile:1

FROM node:20-slim AS base
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends \
  python3 make g++ libc6 libvips && rm -rf /var/lib/apt/lists/*

# --- Install deps (avec devDependencies) ---
FROM base AS deps
ENV NODE_ENV=development
COPY package*.json ./
RUN npm ci

# --- Build Strapi (dev env pour avoir TS, etc.) ---
FROM deps AS build
ENV NODE_ENV=development
COPY . .
RUN npm run build

# --- Installer uniquement les deps de prod ---
FROM base AS prod-deps
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev

# --- Runner final (prod) ---
FROM base AS runner
ENV NODE_ENV=production
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app ./
RUN mkdir -p /app/public/uploads
EXPOSE 1337
CMD ["npm","run","start"]
