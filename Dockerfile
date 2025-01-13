FROM node:18-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN apk add --no-cache redis

WORKDIR /app

COPY package.json ./

RUN pnpm install --no-frozen-lockfile

COPY . .
RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "start"]