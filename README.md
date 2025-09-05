# Sicopesc - Sistema de Controle de Pescadores

## 🚀 Setup Rápido

### Pré-requisitos
- Docker
- Docker Compose

### Instalação

1. **Clone o repositório:**
```bash
git clone <url-do-repositorio>
cd Sicopesc
```

2. **Execute o script de setup:**
```bash
chmod +x setup.sh
./setup.sh
```

3. **Acesse o sistema:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- phpMyAdmin: http://localhost:8082

## 📋 Estrutura do Projeto

```
Sicopesc/
├── Backend/                 # API Node.js + Express
│   ├── src/
│   │   ├── controllers/    # Controladores da API
│   │   ├── models/         # Modelos do Sequelize
│   │   ├── routes/         # Rotas da API
│   │   └── database/
│   │       └── migrations/ # Migrações do banco
│   └── docker-compose.yml  # Configuração Docker Backend
├── Frontend/               # Interface React
│   ├── src/
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── components/    # Componentes React
│   │   └── services/      # Serviços de API
│   └── docker-compose.yml # Configuração Docker Frontend
└── setup.sh               # Script de setup automático
```

## 🔧 Comandos Úteis

### Ver logs dos containers:
```bash
# Backend
sudo docker logs backend-siscol-container

# Frontend
sudo docker logs frontend-sicopesc
```

### Parar serviços:
```bash
# Backend
cd Backend && sudo docker-compose down

# Frontend
cd Frontend && sudo docker-compose down
```

### Reiniciar serviços:
```bash
# Backend
cd Backend && sudo docker-compose restart

# Frontend
cd Frontend && sudo docker-compose restart
```

## 🗄️ Banco de Dados

### Estrutura Principal:
- **pescadores**: Cadastro de pescadores
- **guias**: Guias de pagamento
- **recibos**: Recibos de venda/compra
- **entidades**: Entidades/colônias
- **usuarios**: Usuários do sistema

### Migrações:
As migrações são executadas automaticamente na inicialização do backend.

## 🛠️ Desenvolvimento

### Hot Module Replacement (HMR):
O frontend está configurado com HMR ativo. Alterações no código são aplicadas automaticamente.

### Estrutura de Migrações:
- Todas as alterações de banco devem ser feitas via migrações
- Os campos devem ser definidos tanto no Model quanto na migração inicial
- Migrações são executadas automaticamente no startup

## 📝 Notas Importantes

- O banco de dados é persistido em `Backend/db_data/`
- As migrações garantem que a estrutura do banco seja sempre consistente
- O sistema usa autenticação JWT
- Todas as operações são filtradas por `entidade_id`

## 🐛 Troubleshooting

### Problema: Página não renderiza
```bash
sudo docker logs frontend-sicopesc
```

### Problema: API não responde
```bash
sudo docker logs backend-siscol-container
```

### Problema: Banco não conecta
```bash
sudo docker logs mysql-container
``` 