import React from "react";

import { Container, Form } from "./styles";

import api from "../../services/api";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { FaLock, FaUser } from "react-icons/fa";
import StepsRegister from "./StepsRegister";

export default function Register() {
  const [toResponsavel, setToResponsavel] = useState(false);
  const [password, setPassword] = useState("");

  async function handleSubmitRegister(e) {
    e.preventDefault();
    const data = {
      nome: e.target.nome.value,
      email: e.target.email.value,
      password: e.target.password.value,
      role: "ADMIN",
    };
    const passwordRepeat = e.target.passwordRepeat.value;
    if (passwordRepeat !== data.password) {
      alert("As senhas não estão iguais!");
      return;
    }
    const jsonData = JSON.stringify(data);
    const config = {
      headers: { "content-type": "application/json" },
    };
    const response = await api.post("/users/register", jsonData, config);
    if (response.status === 200) {
      let user = response.data.user;
      user.password = password;
      localStorage.setItem("_token", response.data.token);
      localStorage.setItem("user_name", response.data.user.nome);
      localStorage.setItem("user", JSON.stringify(user));
      setToResponsavel(true);
    }
  }

  if (toResponsavel) {
    return <Redirect to="/register/responsavel" />;
  }

  return (
    <Container>
      <StepsRegister />
      <Form onSubmit={handleSubmitRegister}>
        <div className="mb-4 input-group">
          <span class="input-group-text" id="basic-addon1">
            <FaUser />
          </span>
          <input
            id="first_name"
            className="form-control"
            name="nome"
            type="text"
            autoComplete="off"
            placeholder="Nome"
            required
          />
        </div>

        <div className="mb-4 input-group">
          <span class="input-group-text" id="basic-addon1">
            @
          </span>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="off"
            className="validate form-control"
            placeholder="E-mail"
            required
          />
        </div>
        <div className="mb-4 input-group">
          <span class="input-group-text" id="basic-addon1">
            <FaLock />
          </span>
          <input
            id="password"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            placeholder="Senha"
            required
          />
        </div>
        <div className="mb-4 input-group">
          <span class="input-group-text" id="basic-addon1">
            <FaLock />
          </span>
          <input
            id="passwordRepeat"
            name="passwordRepeat"
            type="password"
            className="form-control"
            placeholder="Repetir senha"
            required
          />
        </div>
        <button
          type="submit"
          className="btn gradient-primary"
          style={{ width: "100%", fontSize: 20 }}
        >
          Próximo
        </button>
      </Form>
    </Container>
  );
}
