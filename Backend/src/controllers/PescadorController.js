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

    const requiredFields = [
      "nome",
      "cpf",
      "rg",
      "nascimento",
      "rgp",
      "data_de_emissao_rgp",
      "data_do_primeiro_rgp",
      "data_de_filiacao",
      "titulo",
      "nit",
      "cei"
    ];
    // Validação de campos obrigatórios
    for (const field of requiredFields) {
      if (!req.body[field] || req.body[field].toString().trim() === "") {
        console.error(`Erro de validação: O campo '${field}' é obrigatório e não pode estar vazio.`);
        return res.status(400).json({ error: `O campo '${field}' é obrigatório e não pode estar vazio.` });
      }
    }
    // Validação específica para campos de data
    const dateFields = [
      "nascimento",
      "data_de_emissao_rgp",
      "data_do_primeiro_rgp",
      "data_de_filiacao"
    ];
    
    for (const field of dateFields) {
      const value = req.body[field];
      if (!value || value.toString().trim() === "" || isNaN(Date.parse(value))) {
        console.error(`Erro de validação: O campo '${field}' deve ser uma data válida e não pode estar vazio.`);
        return res.status(400).json({ error: `O campo '${field}' deve ser uma data válida e não pode estar vazio.` });
      }
    }

    // Validação de CPF válido
    function isValidCPF(cpf) {
      cpf = cpf.replace(/\D/g, "");
      if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
      let sum = 0, rest;
      for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
      rest = (sum * 10) % 11;
      if (rest === 10 || rest === 11) rest = 0;
      if (rest !== parseInt(cpf.substring(9, 10))) return false;
      sum = 0;
      for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
      rest = (sum * 10) % 11;
      if (rest === 10 || rest === 11) rest = 0;
      if (rest !== parseInt(cpf.substring(10, 11))) return false;
      return true;
    }
    if (!isValidCPF(req.body.cpf)) {
      console.error("Erro de validação: CPF inválido.");
      return res.status(400).json({ error: "CPF inválido." });
    }

    // Validação de datas
    const hoje = new Date();
    const dataPrimeiroRgp = new Date(req.body.data_do_primeiro_rgp);
    const dataFiliacao = new Date(req.body.data_de_filiacao);
    if (dataPrimeiroRgp > hoje) {
      console.error("Erro de validação: A data do primeiro RGP não pode ser maior que a data atual.");
      return res.status(400).json({ error: "A data do primeiro RGP não pode ser maior que a data atual." });
    }
    if (dataFiliacao > hoje) {
      console.error("Erro de validação: A data de filiação não pode ser maior que a data atual.");
      return res.status(400).json({ error: "A data de filiação não pode ser maior que a data atual." });
    }

    // Verificação de duplicidade de CPF, RG ou RGP
    const existing = await Pescador.findOne({
      where: {  
        [Op.or]: [
          { cpf: req.body.cpf },
          { rg: req.body.rg },
          { rgp: req.body.rgp }
        ],
        entidade_id
      }
    });
    if (existing) {
      let field = "";
      if (existing.cpf === req.body.cpf) field = "CPF";
      else if (existing.rg === req.body.rg) field = "RG";
      else if (existing.rgp === req.body.rgp) field = "RGP";
      console.error(`Erro de validação: Já existe um pescador cadastrado com este ${field}.`);
      return res.status(400).json({ error: `Já existe um pescador cadastrado com este ${field}.` });
    }

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
