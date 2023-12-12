FROM node:13.12.0-alpine

WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY node_modules node_modules
RUN npm install

COPY . .


EXPOSE 3000