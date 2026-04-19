FROM ghcr.io/overtimeworker/node-ci:latest

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY prisma.config.ts ./
COPY prisma ./prisma
RUN pnpm prisma:generate
RUN pnpm prisma:migrate:deploy
RUN pnpm prisma:seed

COPY src ./src
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]