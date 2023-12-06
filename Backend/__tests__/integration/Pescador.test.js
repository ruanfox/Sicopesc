require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

const request = require("supertest");
const bcrypt = require("bcryptjs");
const faker = require("faker");

const { User, Entidade, Responsavel } = require("../../src/models");
const app = require("../../src/app");

describe("Pescador", () => {
  let user = null;

  beforeAll(async () => {
    const hash = await bcrypt.hash("1234", 12);

    const responsavel = await Responsavel.create({
      nome: faker.name.findName(),
      cpf: "55522233322",
      telefone: faker.phone.phoneNumber(),
    });

    const entidade = await Entidade.create({
      nome: "Colônia6",
      cnpj: "155161449954",
      responsavel_id: responsavel.id,
    });

    const usuario = await User.create({
      nome: "testando",
      email: "gggg@meika.com",
      password: hash,
      role: "ADMIN",
      entidade_id: entidade.id,
    });

    user = usuario;
  });

  it("should store fisher", async () => {
    const response = await request(app)
      .post("/pescadores")
      .send({
        cei: "558871232185",
        cpf: "01456808192",
        data_de_emissao_rgp: "2021-02-15",
        data_de_filiacao: "2021-02-02",
        data_do_primeiro_rgp: "2021-02-01",
        nascimento: "1997-06-16",
        nit: "56115151455",
        nome: "TEST",
        rg: "MG5498787",
        rgp: "MGP1111654",
        titulo: "01",
      })
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it("should get total fisher", async () => {
    const response = await request(app)
      .get("/pescadores/registros/total")
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(response.body).toHaveProperty("count");
  });

  it("should get fishers", async () => {
    const response = await request(app)
      .get("/pescadores/page/1")
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it("should get next birthdays", async () => {
    const response = await request(app)
      .get("/pescadores/proximos/aniversarios")
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(response.body.length).toBeLessThanOrEqual(5);
  });
});
