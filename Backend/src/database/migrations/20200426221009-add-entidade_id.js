"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("pescadors", "entidade_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: "entidades", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("pescadors")
  },
};
