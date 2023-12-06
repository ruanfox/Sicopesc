const { Model, DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const authConfig = require("../config/auth.json");

class User extends Model {
  static init(connection) {
    super.init(
      {
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING(1000),
        role: DataTypes.STRING,
      },
      {
        sequelize: connection,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Entidade, {
      foreignKey: "entidade_id",
      as: "entidade",
    });
    this.hasMany(models.RefreshToken, {
      foreignKey: "user_id",
      as: "refreshs",
    });
  }
}

User.prototype.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

User.prototype.generateToken = function (params = {}) {
  return jwt.sign(
    { ...params, userId: this.id, entidade_id: this.entidade_id },
    authConfig.secret,
    {
      expiresIn: 86400,
    }
  );
};

module.exports = User;
