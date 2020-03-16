FROM node:12.16

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY /migrations ./migrations

COPY knexfile.js ./
COPY config.js ./
COPY index.js ./

CMD npm run migrate:up && npm start