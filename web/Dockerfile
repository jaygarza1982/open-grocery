#Build frontend web server
FROM node:14-alpine as build

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .
RUN npm run build

#Build web server with built react app
FROM nginx:1.19

COPY --from=build /app/build /usr/share/nginx/html