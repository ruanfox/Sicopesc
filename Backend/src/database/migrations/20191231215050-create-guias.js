"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("guias", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      valor: {
        type: Sequelize.DECIMAL(8, 2),
      },
      data_emissao: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW,
      },
      ano: {
        type: Sequelize.INTEGER,
      },
      pescador_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "pescadors", key: "id" },
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
    return queryInterface.dropTable("guias");
  },
};
