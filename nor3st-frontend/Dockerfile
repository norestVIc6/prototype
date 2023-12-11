FROM node:13.12.0-alpine

WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .


EXPOSE 3000