const { Responsavel } = require("../models");

const express = require("express");

const authMiddleware = require("../middlewares/auth");

class ResponsavelController {
  constructor(app) {
    app.use("/responsaveis", this.createRoutes());
  }

  createRoutes() {
    const routes = express.Router();

    routes.use(authMiddleware);

    routes.post("/store", this.store);
    routes.put("/update/:id", this.update);
    routes.get("/:id", this.findByPk);

    return routes;
  }

  async store(req, res) {
    const { nome, cpf, telefone } = req.body;

    const responsavel = await Responsavel.create({
      nome,
      cpf,
      telefone,
    });

    res.json(responsavel);
  }

  async update(req, res) {
    const { id } = req.params;
    const { nome, cpf, telefone } = req.body;

    let responsavel = await Responsavel.findByPk(id);

    if (!responsavel)
      return res.status(404).send({ error: "Responsável não encontrado!" });

    responsavel = await Responsavel.update(
      {
        nome,
        cpf,
        telefone,
      },
      {
        where: {
          id,
        },
      }
    );

    return res.json(responsavel);
  }

  async findByPk(req, res) {
    const { id } = req.params;
    const responsavel = await Responsavel.findByPk(id);
    if (!responsavel)
      return res.status(404).send({ error: "Responsável não encontrado!" });

    return res.json(responsavel);
  }
}

module.exports = (app) => new ResponsavelController(app);
