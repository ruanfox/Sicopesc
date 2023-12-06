const { Model, DataTypes } = require("sequelize");

class Responsavel extends Model {
  static init(connection) {
    super.init(
      {
        nome: DataTypes.STRING,
        cpf: DataTypes.STRING,
        telefone: DataTypes.STRING,
      },
      {
        sequelize: connection,
      }
    );
  }

  static associate(models) {
    this.hasOne(models.Entidade, {
      foreignKey: "responsavel_id",
      as: "responsaveis",
    });
  }
}

module.exports = Responsavel;
