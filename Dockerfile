FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

ENV BASE_URL="https://abitus-api.geia.vip/v1"
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

CMD ["sh", "-c", "npm run build && npm start"]
