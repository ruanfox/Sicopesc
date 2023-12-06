echo "Iniciando..."
cd /home/apps/siscol-backend
git pull origin master
yarn
npx sequelize-cli db:migrate
pm2 restart src/server.js
echo "Finalizou"