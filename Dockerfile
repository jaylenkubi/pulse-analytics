FROM node:18-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN apk add --no-cache redis

WORKDIR /app

COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile  # Install all dependencies including dev

COPY . .
RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "start"]