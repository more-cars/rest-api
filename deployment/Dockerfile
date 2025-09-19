FROM node:24-alpine3.22

WORKDIR /app

COPY .. .

RUN npm ci --omit=dev

ENTRYPOINT ["npm", "start"]
