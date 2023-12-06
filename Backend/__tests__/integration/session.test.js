require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

const request = require("supertest");
const bcrypt = require("bcryptjs");

const { User } = require("../../src/models");

const app = require("../../src/app");

describe("Authentication", () => {
  it("should authenticate with valid credentials", async () => {
    const hash = await bcrypt.hash("123", 12);

    const user = await User.create({
      nome: "Gustavo",
      email: "gg@g.com",
      password: hash,
      role: "ADMIN",
    });

    const response = await request(app).post("/users/authenticate").send({
      email: user.email,
      password: "123",
    });

    expect(response.status).toBe(200);
  });

  it("should'nt authenticate with invalid credentials", async () => {
    const hash = await bcrypt.hash("123", 12);

    const user = await User.create({
      nome: "Gustavo",
      email: "gg@gu.com",
      password: hash,
      role: "ADMIN",
    });

    const response = await request(app).post("/users/authenticate").send({
      email: user.email,
      password: "1234",
    });

    expect(response.status).toBe(401);
  });

  it("should has token when authenticate", async () => {
    const hash = await bcrypt.hash("123", 12);

    const user = await User.create({
      nome: "Gustavo",
      email: "gg@gg.com",
      password: hash,
      role: "ADMIN",
    });

    const response = await request(app).post("/users/authenticate").send({
      email: user.email,
      password: "123",
    });

    expect(response.body).toHaveProperty("token");
  });

  it("should access private route with token", async () => {
    const hash = await bcrypt.hash("123", 12);

    const user = await User.create({
      nome: "Gustavo",
      email: "gg@ggg.com",
      password: hash,
      role: "ADMIN",
    });

    const response = await request(app)
      .get("/pescadores/Fernando")
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it("should'nt access private route without token", async () => {
    const response = await request(app).get("/pescadores/Fernando");

    expect(response.status).toBe(401);
  });
});
