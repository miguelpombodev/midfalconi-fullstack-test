FROM node:20-alpine AS base
WORKDIR /app

RUN npm i -g pnpm 

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS build
WORKDIR /app

COPY . .

RUN pnpm run build

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown -R appuser:appgroup /app
USER appuser

COPY --chown=appuser:appgroup docker-entrypoint.sh .
RUN chmod +x ./docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT [ "./docker-entrypoint.sh" ]

CMD [ "node", "dist/main.js" ]