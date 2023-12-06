"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("recibo", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tipo: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      valor: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: false,
      },
      entidade_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "entidades", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("recibo");
  },
};
