const { User, RefreshToken } = require("../models");
const bcrypt = require("bcryptjs");
const randtoken = require("rand-token");
const express = require("express");

const authMiddleware = require("../middlewares/auth");

class UserController {
  constructor(app) {
    app.use(this.createRoutes());
  }

  createRoutes() {
    const routes = express.Router();
    routes.post("/users/register", this.register);
    routes.post("/users/update/:id", this.update);
    routes.post("/users/authenticate", this.authenticate);
    routes.post("/users/logout", this.logout);
    routes.post("/users/refresh-token", this.refreshTokenCheck);
    

    routes.use(authMiddleware);

    routes.get("/users", this.index);
    routes.get("/user/:id", this.getUserById);
    routes.post("/new-user", this.newUser);
    routes.put("/user", this.updateUserPrivate);
    routes.get("/user-logged", this.getUserLogged);
    routes.delete("/user/:id", this.delete);

    return routes;
  }

  createPublicRoutes() {
    const routes = express.Router();
    routes.post("/users/register", this.register);
    routes.post("/users/update/:id", this.update);
    routes.post("/users/authenticate", this.authenticate);
    routes.post("/users/refresh-token", this.refreshTokenCheck);

    return routes;
  }

  async index(req, res) {
    const { entidade_id } = req;
    const users = await User.findAll({ where: { entidade_id } });

    return res.json(users);
  }

  async getUserById(req, res) {
    const { entidade_id } = req;
    const userId = req.params.id;
    const user = await User.findOne({ where: { entidade_id, id: userId } });

    if (user) {
      user.password = undefined;
      return res.json(user);
    }

    return res.status(404).send({ error: "Usuário não encontrado." });
  }

  async register(req, res) {
    const { nome, email, password, role, entidade_id } = req.body;
    let user = await User.findOne({ where: { email } });
    if (user) return res.status(400).send({ error: "Usuário já existe." });

    const hash = await bcrypt.hash(password, 12);

    user = await User.create({
      nome,
      email,
      password: hash,
      role,
      entidade_id,
    });

    user.password = undefined;
    const token = user.generateToken();
    return res.json({ user, token });
  }

  async newUser(req, res) {
    const { entidade_id } = req;
    const { nome, email, password } = req.body;
    let user = await User.findOne({ where: { email } });
    if (user) return res.status(400).send({ error: "Usuário já existe." });

    const hash = await bcrypt.hash(password, 12);

    user = await User.create({
      nome,
      email,
      password: hash,
      role: "USER",
      entidade_id,
    });

    user.password = undefined;
    return res.json({ user });
  }

  async updateUserPrivate(req, res) {
    const { entidade_id } = req;
    const { id, nome, email, password } = req.body;
    let user = await User.findByPk(id);
    if (!user) return res.status(400).send({ error: "usuário não existe!" });

    const hash = await bcrypt.hash(password, 12);

    user = await User.update(
      {
        nome,
        email,
        password: hash,
        entidade_id,
      },
      {
        where: {
          id,
        },
      }
    );

    user.password = undefined;

    return res.json(user);
  }

  async getUserLogged(req, res) {
    const { userId } = req;
    const user = await User.findByPk(userId);
    if (!user) return res.status(400).send({ error: "usuário não existe!" });
    user.password = undefined;
    return res.json(user);
  }

  async delete(req, res) {
    const { id } = req.params;
    if (!id) return res.status(404).send({ erro: "id não informado!" });
    const affectedRows = await User.destroy({ where: { id: id } });

    return res.json({ affectedRows });
  }

  async update(req, res) {
    const { id } = req.params;
    const { nome, email, password, role, entidade_id } = req.body;
    let user = await User.findByPk(id);
    if (!user) return res.status(400).send({ error: "usuário não existe!" });

    const hash = await bcrypt.hash(password, 12);

    user = await User.update(
      {
        nome,
        email,
        password: hash,
        role,
        entidade_id,
      },
      {
        where: {
          id,
        },
      }
    );

    return res.json(user);
  }

  async authenticate(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).send({ error: "user not found" });

    if (!(await user.checkPassword(password)))
      return res.status(401).send({ error: "password incorrect" });

    user.password = undefined;

    const token = user.generateToken();

    let refreshToken = await RefreshToken.findOne({
      where: {
        user_id: user.id,
        is_valid: true,
      },
    });

    if (!refreshToken) {
      const tokenRefresh = randtoken.uid(16);

      refreshToken = await RefreshToken.create({
        token: tokenRefresh,
        is_valid: true,
        user_id: user.id,
      });
    }

    return res.json({ user, token, refresh_token: refreshToken.token });
  }

  async logout(req, res) {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return res.status(400).send({ error: "Refresh token não informado." });
    }

    const refreshToken = await RefreshToken.findOne({
      where: { token: refresh_token },
    });

    if (!refreshToken) {
      return res.status(400).send({ error: "Refresh token inválido." });
    }

    await RefreshToken.update(
      { is_valid: false },
      { where: { id: refreshToken.id } }
    );

    return res.status(200).send({ message: "Logout realizado com sucesso." });
  }

  async refreshTokenCheck(req, res) {
    const { refresh_token } = req.body;
    let refreshToken = await RefreshToken.findOne({
      where: { token: refresh_token, is_valid: true },
    });

    if (!refreshToken)
      return res.status(401).send({ error: "invalid refresh token" });

    const user = await User.findOne({ where: { id: refreshToken.user_id } });

    await RefreshToken.destroy({ where: { id: refreshToken.id } });

    const tokenRefresh = randtoken.uid(16);

    refreshToken = await RefreshToken.create({
      token: tokenRefresh,
      is_valid: true,
      user_id: user.id,
    });

    const token = user.generateToken();

    return res.json({ refresh_token: refreshToken.token, token });
  }
}

module.exports = (app) => new UserController(app);
