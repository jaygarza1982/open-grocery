
FROM node:14

WORKDIR /app

RUN npm i nodemon -g

COPY package.json .
COPY package-lock.json .
RUN npm i

COPY . .

CMD ["node", "app.js"]