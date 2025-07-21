const { Model, DataTypes } = require("sequelize");
const sequelize = require("sequelize");

class Guias extends Model {
  static init(connection) {
    super.init(
      {
        valor: DataTypes.DECIMAL,
        data_emissao: DataTypes.DATE,
        ano: DataTypes.INTEGER,
        rgp: DataTypes.STRING(20),
      },
      {
        sequelize: connection,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Pescador, {
      foreignKey: "pescador_id",
      as: "pescador",
    });
  }
}

Guias.totalMonth = async function (month, year, entidade_id) {
  sequelize.fn();
  const valoresMensais = await this.findAll({
    attributes: [[sequelize.fn("sum", sequelize.col("valor")), "totalMonth"]],
    include: {
      association: "pescador",
      attributes: [],
      where: {
        entidade_id,
      },
    },
    group: "valor",
    where: [
      sequelize.where(
        sequelize.fn("YEAR", sequelize.col("data_emissao")),
        year
      ),
      sequelize.where(
        sequelize.fn("MONTH", sequelize.col("data_emissao")),
        month
      ),
    ],
  });

  let valorTotal = 0;

  valoresMensais.forEach((valor) => {
    valorTotal += parseFloat(valor.dataValues.totalMonth);
  });

  return { totalMonth: valorTotal };
};
module.exports = Guias;
