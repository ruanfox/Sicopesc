echo "Iniciando..."
cd /var/www/siscol-frontend
git pull origin master
yarn install
yarn build
echo "Finalizou"