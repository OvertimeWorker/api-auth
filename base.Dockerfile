FROM node:24

RUN npm install -g pnpm prisma

WORKDIR /app