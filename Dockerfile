FROM node:18-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile  # Install all dependencies including dev

RUN pnpm install @nestjs/cli --save-dev

COPY . .
RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "start:prod"]