# Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV NEXT_PUBLIC_BASE_URL="https://abitus-api.geia.vip/v1"
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

RUN npm run build

# Run
FROM node:20-alpine AS runner

WORKDIR /app

ENV NEXT_PUBLIC_BASE_URL="https://abitus-api.geia.vip/v1"
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

# Copy files
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]
