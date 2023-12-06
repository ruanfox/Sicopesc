const { Endereco, Pescador } = require("../models");

const express = require("express");
const authMiddleware = require("../middlewares/auth");

class EnderecoController {
  constructor(app) {
    app.use(this.createRoutes());
  }

  createRoutes() {
    const routes = express.Router();

    routes.use(authMiddleware);

    routes.put("/enderecos/:id", this.update);
    routes.delete("/enderecos/:id", this.delete);
    routes.post("/pescadores/:pescador_id/enderecos", this.store);
    routes.get("/pescadores/:pescador_id/enderecos", this.index);

    return routes;
  }

  async store(req, res) {
    const { pescador_id } = req.params;
    const { logradouro, numero, bairro, cidade, estado, cep } = req.body;

    const pescador = await Pescador.findByPk(pescador_id);

    if (!pescador) {
      return res.status(400).json({ error: "Pescador não encontrado!" });
    }
    const endereco = await Endereco.create({
      logradouro,
      numero,
      bairro,
      cidade,
      estado,
      cep,
      pescador_id,
    });
    return res.json(endereco);
  }

  async update(req, res) {
    const { id } = req.params;
    const { logradouro, numero, bairro, cidade, estado, cep } = req.body;
    const endereco = await Endereco.update(
      {
        logradouro,
        numero,
        bairro,
        cidade,
        estado,
        cep,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return res.json(endereco);
  }

  async delete(req, res) {
    const { id } = req.params;
    const endereco = await Endereco.destroy({ where: { id } });
    return res.json({ rows: endereco });
  }

  async index(req, res) {
    const { pescador_id } = req.params;
    const pescador = await Pescador.findByPk(pescador_id, {
      include: { association: "enderecos" },
    });

    if (!pescador) {
      return res.status(400).json({ error: "Pescador não encontrado!" });
    }

    return res.json(pescador.enderecos);
  }
}

module.exports = (app) => new EnderecoController(app);
