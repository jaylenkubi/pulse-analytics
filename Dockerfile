FROM node:18-alpine

RUN corepack enable && corepack prepare pnpm@9.15.2 --activate

RUN apk add --no-cache redis

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY tsconfig.json ./
COPY src/ ./src/

RUN pnpm install --frozen-lockfile

RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "start"]