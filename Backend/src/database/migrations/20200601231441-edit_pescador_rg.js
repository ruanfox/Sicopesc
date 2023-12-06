"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("pescadors", "rg", {
      type: Sequelize.STRING(20),
      allowNull: false,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("pescadors", "rg", {
      type: Sequelize.STRING(10),
      allowNull: true,
    });
  },
};
