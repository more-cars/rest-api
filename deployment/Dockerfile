FROM node:26-alpine3.23

WORKDIR /app

COPY .. .

RUN npm ci --omit=dev

RUN npm run build

ENTRYPOINT ["npm", "start"]
