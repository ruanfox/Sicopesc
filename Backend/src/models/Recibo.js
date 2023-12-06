const { Model, DataTypes } = require("sequelize");

class Recibo extends Model {
  static init(connection) {
    super.init(
      {
        tipo: DataTypes.STRING(10),
        descricao: DataTypes.STRING,
        cpf: DataTypes.STRING,
        valor: DataTypes.DECIMAL(8, 2),
        nome: DataTypes.STRING,
      },
      {
        sequelize: connection,
        tableName: "recibo",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Entidade, {
      foreignKey: "entidade_id",
      as: "entidade",
    });
  }
}

module.exports = Recibo;
