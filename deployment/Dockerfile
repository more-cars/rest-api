FROM node:22-alpine3.20

WORKDIR /app

COPY . .

RUN npm ci

ENTRYPOINT ["npm", "start"]
