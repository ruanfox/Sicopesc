const { Model, DataTypes } = require("sequelize");

class Entidade extends Model {
  static init(connection) {
    super.init(
      {
        nome: DataTypes.STRING,
        cnpj: DataTypes.STRING,
      },
      {
        sequelize: connection,
      }
    );
  }
  static associate(models) {
    this.hasMany(models.Pescador, {
      foreignKey: "entidade_id",
      as: "pescadores",
    });
    this.hasMany(models.User, {
      foreignKey: "entidade_id",
      as: "users",
    });
    this.belongsTo(models.Responsavel, { 
      foreignKey: 'responsavel_id', 
      as: 'responsavel'
    });
  }
}

module.exports = Entidade;
