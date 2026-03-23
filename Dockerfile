FROM oven/bun:1.1.15-alpine
WORKDIR /app

RUN mkdir -p /app/db

# Copiar dependencias primero para aprovechar la cache de Docker
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . .

ENV NODE_ENV=production

# Construir la aplicación
RUN bun run build

# Exponer el puerto
EXPOSE 3000

CMD ["bun", "start"]
