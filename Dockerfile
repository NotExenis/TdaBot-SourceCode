FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
COPY .env ./
COPY src ./src

ENV NODE_ENV=production

RUN npm ci --emit=dev

CMD [ "npm", "start" ]
