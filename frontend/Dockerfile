FROM node:20-alpine AS builder
WORKDIR /app

RUN npm i -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:20-alpine AS runner
WORKDIR /app

RUN npm i -g pnpm

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod

COPY --from=builder --chown=appuser:appgroup /app/.next ./.next
COPY --from=builder --chown=appuser:appgroup /app/public ./public
COPY --from=builder --chown=appuser:appgroup /app/next.config.mjs ./next.config.mjs

USER appuser

EXPOSE 3000

CMD ["pnpm", "start"]