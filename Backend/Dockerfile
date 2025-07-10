FROM node:12

WORKDIR /home/app

COPY . .

RUN npm install

EXPOSE 4000

CMD ["bash", "-c", "npx sequelize db:migrate && npm run dev"]
