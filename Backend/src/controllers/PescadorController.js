const { Entidade, Guia } = require("../models");
const Pescador = require("../models/Pescador");

const { Op } = require("sequelize");
const paginate = require("express-paginate");

const express = require("express");
const authMiddleware = require("../middlewares/auth");

class PescadorController {
  constructor(app) {
    app.use("/pescadores", this.createRoutes());
  }

  createRoutes() {
    const routes = express.Router();

    routes.use(authMiddleware);

    routes.use(paginate.middleware(10, 50));

    routes.post("/", this.store);
    routes.put("/:id", this.update);
    routes.delete("/:id", this.delete);
    routes.get("/", this.index);
    routes.get("/:id", this.findById);
    routes.get("/nome/:nome", this.findByNome);
    routes.get("/registros/total", this.getTotalPescadores);
    routes.get("/proximos/aniversarios", this.getProximosAniversarios);
    routes.get("/rgp/:rgp", this.findByRgp);

    return routes;
  }

  async index(req, res) {
    const { entidade_id } = req;

    const limit = req.query.limit ? req.query.limit : 10;
    const page = req.query.page ? req.query.page : 1;

    const result = await Pescador.findAndCountAll({
      limit,
      offset: req.skip,
      where: {
        entidade_id,
      },
    });

    const itemCount = result.count;
    const pageCount = Math.ceil(result.count / limit);

    return res.json({
      pescadores: result.rows,
      pageCount,
      itemCount,
      currentPage: page,
      pages: paginate.getArrayPages(req)(3, pageCount, page),
    });
  }

  async store(req, res) {
    const { entidade_id } = req;

    const entidade = await Entidade.findByPk(entidade_id);

    if (!entidade)
      return res.status(404).json({ error: "entidade não encontrada!" });

    const pescador = await Pescador.create({
      ...req.body,
      entidade_id,
    });

    return res.json(pescador);
  }

  async update(req, res) {
    const { id } = req.params;

    const pescador = await Pescador.update(
      {
        ...req.body,
      },
      {
        where: {
          id: id,
        },
      }
    );
    if (pescador[0] === 1) return res.json({ updated: true });
    else return res.json({ updated: false });
  }

  async delete(req, res) {
    const { id } = req.params;
    const pescador = await Pescador.destroy({ where: { id } });
    return res.json({ rows: pescador });
  }

  async findById(req, res) {
    const { id } = req.params;
    const pescador = await Pescador.findByPk(id);
    return res.json(pescador);
  }

  async findByNome(req, res) {
    const { nome } = req.params;

    const { entidade_id } = req;

    const limit = req.query.limit ? req.query.limit : 10;
    const page = req.query.page ? req.query.page : 1;

    const result = await Pescador.findAndCountAll({
      limit,
      offset: req.skip,
      where: {
        nome: {
          [Op.like]: `%${nome}%`,
        },
        entidade_id,
      },
    });

    const itemCount = result.count;
    const pageCount = Math.ceil(result.count / limit);

    return res.json({
      pescadores: result.rows,
      pageCount,
      itemCount,
      currentPage: page,
      pages: paginate.getArrayPages(req)(3, pageCount, page),
    });
  }

  async findByRgp(req, res) {
    const { rgp } = req.params;

    const { entidade_id } = req;

    const pescador = await Pescador.findOne({
      where: {
        rgp,
        entidade_id,
      },
      include: {
        association: "guias",
      },
    });

    return res.json(pescador);
  }

  async getTotalPescadores(req, res) {
    const { entidade_id } = req;
    //const entidade = await Entidade.findByPk(entidade_id, {include:{ association: 'pescadores'}});
    const entidade = await Entidade.findAndCountAll({
      where: { id: entidade_id },
      include: { association: "pescadores" },
    });
    delete entidade.rows;
    return res.json(entidade);
  }

  async getProximosAniversarios(req, res) {
    const { entidade_id } = req;
    const pescadores = await Pescador.getLastBirthdays(entidade_id);
    return res.json(pescadores);
  }
}

module.exports = (app) => new PescadorController(app);
