const { Entidade, Recibo } = require("../models");
const Pescador = require("../models/Pescador");

const { Op } = require("sequelize");
const paginate = require("express-paginate");
const numero = require("numero-por-extenso");

const sequelize = require("sequelize");

const express = require("express");
const authMiddleware = require("../middlewares/auth");

class ReciboController {
  constructor(app) {
    app.use("/recibo", this.createRoutes());
  }

  createRoutes() {
    const routes = express.Router();

    routes.use(authMiddleware);

    routes.use(paginate.middleware(10, 50));

    routes.post("/", this.store);
    routes.delete("/:id", this.delete);
    routes.get("/", this.index);
    routes.get("/:id", this.findById);
    routes.get("/nome/:nome", this.findByNome);
    routes.get("/relatorio/get", this.getRelatorioRecibos);

    return routes;
  }

  async index(req, res) {
    const { entidade_id } = req;

    const limit = req.query.limit ? req.query.limit : 10;
    const page = req.query.page ? req.query.page : 1;

    const result = await Recibo.findAndCountAll({
      limit,
      offset: req.skip,
      where: {
        entidade_id,
      },
    });

    const itemCount = result.count;
    const pageCount = Math.ceil(result.count / limit);

    return res.json({
      recibos: result.rows,
      pageCount,
      itemCount,
      currentPage: page,
      pages: paginate.getArrayPages(req)(3, pageCount, page),
    });
  }

  async store(req, res) {
    try {
      const { entidade_id } = req;
  
      const entidade = await Entidade.findByPk(entidade_id);
  
      if (!entidade)
        return res.status(404).json({ error: "entidade não encontrada!" });
  
      let pescador = null;
  

  
      if (req.body.cpf && req.body.nome && req.body.cpf.trim() && req.body.nome.trim()) {
        pescador = await Pescador.findOne({
          where: {
            cpf: req.body.cpf,
            nome: req.body.nome,
            entidade_id
          }
        });

      }
  
      if (!pescador && req.body.rgp && req.body.rgp.trim()) {
        pescador = await Pescador.findOne({
          where: {
            rgp: req.body.rgp,
            entidade_id
          }
        });
        console.log('Busca por RGP:', pescador ? pescador.id : 'não encontrado');
      }
  
      if (!pescador && req.body.nome && req.body.nome.trim()) {
        pescador = await Pescador.findOne({
          where: {
            nome: req.body.nome,
            entidade_id
          }
        });
        console.log('Busca por Nome simples:', pescador ? pescador.id : 'não encontrado');
      }
  
      if (!pescador) {
        console.log('Pescador não encontrado com os dados fornecidos');
        return res.status(404).json({ error: "Pescador não encontrado." });
      }
  
            const recibo = await Recibo.create({
        ...req.body,
        entidade_id,
        pescador_id: pescador.id,
      });

      return res.json(recibo);
    } catch (err) {
      console.error("Erro ao criar recibo:", err);
      return res.status(400).json({ error: err.message || "Erro ao gerar o recolhimento." });
    }
  }
  
  

  async delete(req, res) {
    const { id } = req.params;
    const recibo = await Recibo.destroy({ where: { id } });
    return res.json({ rows: recibo });
  }

  async findById(req, res) {
    const { id } = req.params;
    const recibo = await Recibo.findByPk(id, {
      include: {
        association: "entidade",
        include: {
          association: "responsavel",
        },
      },
    });

    if(!recibo) return res.status(404).send({'message': "recibo não encontrado."})

    recibo.valor = {
      numero: recibo.valor,
      por_extenso: numero.porExtenso(recibo.valor, numero.estilo.monetario),
    };

    return res.json(recibo);
  }

  async findByNome(req, res) {
    const { nome } = req.params;

    const { entidade_id } = req;

    const limit = req.query.limit ? req.query.limit : 10;
    const page = req.query.page ? req.query.page : 1;

    const result = await Recibo.findAndCountAll({
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
      recibos: result.rows,
      pageCount,
      itemCount,
      currentPage: page,
      pages: paginate.getArrayPages(req)(3, pageCount, page),
    });
  }

  async getRelatorioRecibos(req, res) {
    const { entidade_id } = req;
    const { data_inicio, data_fim } = req.query;

    const limit = req.query.limit ? req.query.limit : 10;
    const page = req.query.page ? req.query.page : 1;

    try {
      const result = await Recibo.findAndCountAll({
        limit,
        offset: req.skip,
        where: {
          created_at: {
            [sequelize.Op.gte]: data_inicio,
            [sequelize.Op.lte]: data_fim,
          },
          entidade_id,
        },
      });

      const entradas = await Recibo.sum("valor", {
        where: {
          created_at: {
            [sequelize.Op.gte]: data_inicio,
            [sequelize.Op.lte]: data_fim,
          },
          entidade_id,
          tipo: 'venda'
        },
      });

      const saidas = await Recibo.sum("valor", {
        where: {
          created_at: {
            [sequelize.Op.gte]: data_inicio,
            [sequelize.Op.lte]: data_fim,
          },
          entidade_id,
          tipo: 'compra'
        },
      });

      const itemCount = result.count;
      const pageCount = Math.ceil(result.count / limit);

      return res.json({
        recibos: result.rows,
        pageCount,
        itemCount,
        currentPage: page,
        totalRecolhido: entradas - saidas,
        entradas,
        saidas,
        //totalPescadores: totalPescadoresPagantes,
        pages: paginate.getArrayPages(req)(3, pageCount, page),
      });
    } catch (err) {
      return res.status(500).send({ error: `Erro interno: ${err.message}` });
    }
  }
}

module.exports = (app) => new ReciboController(app);
