FROM node:12

WORKDIR /home/app

COPY package*.json ./

CMD npm i && npm run start

COPY . .

EXPOSE 3000