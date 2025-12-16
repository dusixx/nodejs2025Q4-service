FROM node:24-alpine AS builder

ARG POSTGRES_URL
ENV POSTGRES_URL=${POSTGRES_URL}

WORKDIR /app

COPY package*.json ./
RUN npm ci && npm cache clean --force

COPY src ./src
COPY doc ./doc
COPY prisma.config.ts nest-cli.json tsconfig*.json ./
RUN npx prisma generate && npm run build

FROM node:24-alpine AS dev

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

FROM node:24-alpine AS cleanup

WORKDIR /app

COPY --from=dev /app/node_modules ./node_modules
RUN find node_modules -name "CHANGELOG*" -delete && \
    find node_modules -name "LICENSE*" -delete && \
    find node_modules -name "README*" -delete && \
    find node_modules -name "*.md" -delete && \
    find node_modules -name "*.txt" -delete && \
    find node_modules -name "*.map" -delete && \
    find node_modules -name "*.d.ts" -delete && \
    find node_modules -name "*.ts" -delete && \
    rm -rf node_modules/typescript 2>/dev/null || true

FROM node:24-alpine

WORKDIR /app

COPY --from=cleanup /app/node_modules ./node_modules
COPY --from=builder /app/prisma.config.ts ./
COPY --from=builder /app/src ./src
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/doc ./doc

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main.js"]