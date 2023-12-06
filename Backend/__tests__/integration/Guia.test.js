require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

const request = require("supertest");
const bcrypt = require("bcryptjs");
const faker = require("faker");

const { User, Entidade, Responsavel, Pescador } = require("../../src/models");
const app = require("../../src/app");

describe("Guia", () => {
  let user = {};
  let pescador = {};

  beforeAll(async () => {
    const hash = await bcrypt.hash("1234", 12);

    const responsavel = await Responsavel.create({
      nome: faker.name.findName(),
      cpf: "55522233324",
      telefone: faker.phone.phoneNumber(),
    });

    const entidade = await Entidade.create({
      nome: "Colônia6",
      cnpj: "155161449956",
      responsavel_id: responsavel.id,
    });

    const usuario = await User.create({
      nome: "testando",
      email: "test@testguia.com",
      password: hash,
      role: "ADMIN",
      entidade_id: entidade.id,
    });

    const fisher = await Pescador.create({
      cei: "558871232186",
      cpf: "01456808197",
      data_de_emissao_rgp: "2021-02-15",
      data_de_filiacao: "2021-02-02",
      data_do_primeiro_rgp: "2021-02-01",
      nascimento: "1997-06-16",
      nit: "56115151456",
      nome: "TEST",
      rg: "MG5498788",
      rgp: "MGP1111655",
      titulo: "01454",
      entidade_id: entidade.id,
    });

    pescador = fisher;
    user = usuario;
  });

  it("should store a guia", async () => {
    const response = await request(app)
      .post(`/pescadores/${pescador.id}/guias`)
      .send({ valor: 200, data_emissao: "2021-02-03", ano: 2020 })
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  /*it("should get guias by fisher name", async () => {
    const response = await request(app)
      .get(`/guias/nome/${pescador.nome}`)
      .set("Authorization", `Bearer ${user.generateToken()}`);

    console.log(response.body);
    expect(response.status).toBe(200);
  });*/
});
