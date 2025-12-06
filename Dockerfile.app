FROM node:24-alpine AS builder

ARG POSTGRES_URL
ARG POSTGRES_PORT

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

ENV POSTGRES_URL=${POSTGRES_URL}
RUN npx prisma generate

FROM node:24-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder --chown=node:node /app/dist ./dist
COPY --from=builder --chown=node:node /app/prisma.config.ts ./
COPY --from=builder --chown=node:node /app/src/prisma ./src/prisma
COPY --from=builder --chown=node:node /app/doc ./doc

EXPOSE ${POSTGRES_PORT}

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main.js"]