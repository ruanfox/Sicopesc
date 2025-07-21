#!/bin/bash

echo "🚀 Configurando o projeto Sicopesc..."

# Verificar se o Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não está instalado. Por favor, instale o Docker primeiro."
    exit 1
fi

# Verificar se o Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose não está instalado. Por favor, instale o Docker Compose primeiro."
    exit 1
fi

echo "✅ Docker e Docker Compose encontrados"

# Criar arquivo .env se não existir
if [ ! -f "Backend/.env" ]; then
    echo "📝 Criando arquivo .env..."
    cat > Backend/.env << EOF
DB_HOST=db_siscol
DB_USER=root
DB_PASS=root
DB_NAME=siscol
DB_ROOT_PASS=root
EOF
    echo "✅ Arquivo .env criado"
else
    echo "✅ Arquivo .env já existe"
fi

# Iniciar o backend
echo "🔧 Iniciando o backend..."
cd Backend
sudo docker-compose up -d

echo "⏳ Aguardando o banco de dados inicializar..."
sleep 30

echo "📊 Verificando se as migrações foram executadas..."
sudo docker logs backend-siscol-container | grep -i "migrate"

echo "🌐 Iniciando o frontend..."
cd ../Frontend
sudo docker-compose up -d

echo "✅ Setup concluído!"
echo ""
echo "📋 URLs do sistema:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:4000"
echo "   phpMyAdmin: http://localhost:8082"
echo ""
echo "🔧 Para ver os logs:"
echo "   Backend: sudo docker logs backend-siscol-container"
echo "   Frontend: sudo docker logs frontend-sicopesc"
echo ""
echo "🛑 Para parar os serviços:"
echo "   sudo docker-compose down (em cada pasta)" 