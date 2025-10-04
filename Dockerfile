# syntax=docker/dockerfile:1

# Base Debian (évite les galères de sharp sur Alpine)
FROM node:20-slim AS base
ENV NODE_ENV=production
WORKDIR /app

# Dépendances système utiles (node-gyp + sharp)
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ libc6 libvips \
 && rm -rf /var/lib/apt/lists/*

# ----- Dépendances npm
FROM base AS deps
COPY package*.json ./
RUN npm ci

# ----- Build Strapi
FROM deps AS build
ENV NODE_ENV=production
COPY . .
RUN npm run build

# ----- Runner final
FROM base AS runner
# on copie uniquement ce qu'il faut pour exécuter
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app ./
# dossier uploads (persistance via volume côté Coolify)
RUN mkdir -p /app/public/uploads
EXPOSE 1337
CMD ["npm", "run", "start"]
