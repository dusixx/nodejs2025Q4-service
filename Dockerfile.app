FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .
COPY prisma.config.ts ./

RUN npm run build
ENV DATABASE_URL="postgresql://user:user123@database:5432/home-lib-db?schema=public"
RUN npx prisma generate

FROM node:24-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder --chown=node:node /app/dist ./dist
COPY --from=builder --chown=node:node /app/prisma.config.ts ./

EXPOSE 4000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main.js"]