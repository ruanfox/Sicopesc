const { Entidade, Responsavel } = require("../models");

const express = require("express");
const authMiddleware = require("../middlewares/auth");

class EntidadeController {
  constructor(app) {
    app.use("/entidades", this.createRoutes());
  }

  createRoutes() {
    const routes = express.Router();

    routes.use(authMiddleware);

    routes.post("/store/:id", this.store);
    routes.get("/:id", this.findById);
    routes.put("/:id", this.update);

    return routes;
  }

  async store(req, res) {
    const { id } = req.params;
    const { nome, cnpj } = req.body;

    const responsavel = await Responsavel.findByPk(id);

    if (!responsavel)
      return res.status(404).send({ error: "Responsável não encontrado!" });

    const entidade = await Entidade.create({
      nome,
      cnpj,
      responsavel_id: id,
    });

    return res.json(entidade);
  }

  async findById(req, res) {
    const { id } = req.params;

    const entidade = await Entidade.findByPk(id);

    if (!entidade)
      return res.status(404).send({ error: "Entidade não encontrada!" });

    return res.json(entidade);
  }

  async update(req, res) {
    const { id } = req.params;
    const { nome, cnpj } = req.body;

    let entidade = await Entidade.findByPk(id);

    if (!entidade)
      return res.status(404).send({ error: "Entidade não encontrada!" });

    entidade = Entidade.update(
      {
        nome,
        cnpj,
      },
      {
        where: {
          id,
        },
      }
    );

    return res.json(entidade);
  }
}

module.exports = (app) => new EntidadeController(app);
