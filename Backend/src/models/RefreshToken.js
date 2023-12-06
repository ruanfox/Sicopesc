const { Model, DataTypes } = require("sequelize");

class RefreshToken extends Model {
  static init(connection) {
    super.init(
      {
        token: DataTypes.STRING(16),
        is_valid: DataTypes.BOOLEAN,
      },
      {
        sequelize: connection,
        tableName: "refresh_token",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
  }
}

module.exports = RefreshToken;
