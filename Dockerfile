# Build
FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Run
from node:20-alpine as runner

WORKDIR /app

# Copy files
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

ENV BASE_URL="https://abitus-api.geia.vip/v1"
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

EXPOSE 3000

CMD ["npm", "start"]
