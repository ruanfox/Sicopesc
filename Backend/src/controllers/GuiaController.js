const { Guias: Guia, Pescador } = require("../models");

const sequelize = require("sequelize");
const paginate = require("express-paginate");

const valor = require("../../config.json");

const express = require("express");
const authMiddleware = require("../middlewares/auth");

class GuiaController {
  constructor(app) {
    app.use(this.createRoutes());
  }

  createRoutes() {
    const routes = express.Router();

    routes.use(authMiddleware);
    routes.use(paginate.middleware(10, 50));

    routes.get("/guias/totalMensal/", this.getTotalMonth);
    routes.post("/pescadores/:pescador_id/guias", this.store);
    routes.get("/guias", this.index);
    routes.get("/guias/:id", this.findById);
    routes.put("/guias/:id", this.update);
    routes.delete("/guias/:id", this.delete);
    routes.post("/guias/payNextYear", this.payNextYear);
    routes.get("/guias/nome/:nome", this.getGuiaByNomePescador);
    routes.post("/guias/sync", this.syncGuiaPescador);
    routes.get("/guias/pescador/relatorio", this.getRelatorioGuias);

    return routes;
  }

  async store(req, res) {
    const { pescador_id } = req.params;
    const { valor, data_emissao, ano } = req.body;

    try {
      const pescador = await Pescador.findByPk(pescador_id);

      if (!pescador)
        return res.status(404).json({ error: "Pescador não encontrado!" });

      const guia = await Guia.create({
        valor,
        data_emissao,
        ano,
        pescador_id,
      });
      return res.json(guia);
    } catch (err) {
      return res.status(500).send({ error: `Erro interno: ${err.message}` });
    }
  }

  async index(req, res) {
    const { entidade_id } = req;

    const limit = req.query.limit ? req.query.limit : 10;
    const page = req.query.page ? req.query.page : 1;

    try {
      const result = await Guia.findAndCountAll({
        limit,
        offset: req.skip,
        include: { association: "pescador", where: { entidade_id } },
        order: [["id", "DESC"]],
      });

      const itemCount = result.count;
      const pageCount = Math.ceil(result.count / limit);

      return res.json({
        guias: result.rows,
        pageCount,
        itemCount,
        currentPage: page,
        pages: paginate.getArrayPages(req)(3, pageCount, page),
      });
    } catch (err) {
      return res.status(500).send({ error: `Erro interno: ${err.message}` });
    }
  }

  async getTotalMonth(req, res) {
    try {
      const { entidade_id } = req;
      const data = new Date();

      const totalMonth = await Guia.totalMonth(
        data.getMonth() + 1,
        data.getFullYear(),
        entidade_id
      );

      return res.json(totalMonth);
    } catch (err) {
      return res.status(500).send({ error: `Erro interno: ${err.message}` });
    }
  }

  async findById(req, res) {
    try {
      const { id } = req.params;
      const guia = await Guia.findByPk(id, {
        include: {
          association: "pescador",
          include: { association: "enderecos" },
        },
      });
      return res.json(guia);
    } catch (err) {
      return res.status(500).send({ error: `Erro interno: ${err.message}` });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { valor, data_emissao, ano } = req.body;

      const guia = await Guia.update(
        {
          valor,
          data_emissao,
          ano,
        },
        {
          where: {
            id,
          },
        }
      );

      return res.json(guia);
    } catch (err) {
      return res.status(500).send({ error: `Erro interno: ${err.message}` });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(404).send({ erro: "id não informado!" });
      const affectedRows = await Guia.destroy({ where: { id: id } });

      return res.json({ affectedRows });
    } catch (err) {
      return res.status(500).send({ error: `Erro interno: ${err.message}` });
    }
  }

  async getGuiaByNomePescador(req, res) {
    const { nome } = req.params;

    const { entidade_id } = req;

    const limit = req.query.limit ? req.query.limit : 10;
    const page = req.query.page ? req.query.page : 1;

    try {
      const result = await Guia.findAndCountAll({
        limit,
        offset: req.skip,
        order: [["id", "DESC"]],
        include: {
          association: "pescador",
          where: {
            nome: {
              [sequelize.Op.like]: `%${nome}%`,
            },
            entidade_id,
          },
        },
      });

      const itemCount = result.count;
      const pageCount = Math.ceil(result.count / limit);

      return res.json({
        guias: result.rows,
        pageCount,
        itemCount,
        currentPage: page,
        pages: paginate.getArrayPages(req)(3, pageCount, page),
      });
    } catch (e) {
      return res.status(500).send({ error: `Erro interno: ${e.message}` });
    }
  }

  async payNextYear(req, res) {
    const { pescador_id } = req.body;

    try {
      const lastGuia = await Guia.findOne({
        order: [["ano", "DESC"]],
        where: {
          pescador_id,
        },
      });

      const guia = await Guia.create({
        pescador_id: lastGuia.pescador_id,
        data_emissao: new Date(),
        ano: lastGuia.ano + 1,
        valor: valor.valorGuia,
      });
      return res.json(guia);
    } catch (err) {
      return res.status(500).send({ error: `Erro interno: ${err.message}` });
    }
  }

  async syncGuiaPescador(req, res) {
    const guias = await Guia.findAll();
    guias.forEach(async (guia) => {
      const pescador = await Pescador.findOne({ where: { id: guia.pescador_id } });
      if (pescador) {
        await Guia.update(
          {
            ...guia.toJSON(),
            pescador_id: pescador.id,
          },
          {
            where: {
              id: guia.id,
            },
          }
        );
      }
    });
    return res.json({ Message: "sync complete!", guias });
  }

  async getRelatorioGuias(req, res) {
    const { entidade_id } = req;
    const { data_inicio, data_fim } = req.query;

    const limit = req.query.limit ? req.query.limit : 10;
    const page = req.query.page ? req.query.page : 1;

    try {
      const result = await Guia.findAndCountAll({
        limit,
        offset: req.skip,
        where: {
          data_emissao: {
            [sequelize.Op.gte]: data_inicio,
            [sequelize.Op.lte]: data_fim,
          },
        },
        include: {
          association: "pescador",
          where: {
            entidade_id,
          },
        },
      });

      const totalRecolhido = await Guia.sum("valor", {
        include: {
          association: "pescador",
          attributes: [],
          where: {
            entidade_id,
          },
        },
        where: {
          data_emissao: {
            [sequelize.Op.gte]: data_inicio,
            [sequelize.Op.lte]: data_fim,
          },
        },
      });

      const itemCount = result.count;
      const pageCount = Math.ceil(result.count / limit);

      return res.json({
        guias: result.rows,
        pageCount,
        itemCount,
        currentPage: page,
        totalRecolhido: totalRecolhido,
        //totalPescadores: totalPescadoresPagantes,
        pages: paginate.getArrayPages(req)(3, pageCount, page),
      });
    } catch (err) {
      return res.status(500).send({ error: `Erro interno: ${err.message}` });
    }
  }
}

module.exports = (app) => new GuiaController(app);
