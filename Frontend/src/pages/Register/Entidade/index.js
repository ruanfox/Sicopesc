import React from "react";

import { Container } from "./styles";
import { Form } from "../styles";

import api from "../../../services/api";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import StepsRegister from "../StepsRegister";
import { FaAddressCard, FaBuilding } from "react-icons/fa";

function RegisterEntidade() {
  const [toMain, setToMain] = useState(false);

  async function handleSubmitRegister(e) {
    e.preventDefault();
    const data = {
      nome: e.target.nome.value,
      cnpj: e.target.cnpj.value,
    };

    const jsonData = JSON.stringify(data);
    const token = localStorage.getItem("_token");

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const responsavelId = localStorage.getItem("responsavel_id");
    const response = await api.post(
      `/entidades/store/${responsavelId}`,
      jsonData,
      config
    );
    if (response.status === 200) {
      localStorage.removeItem("responsavel_id");
      localStorage.setItem("entidade_id", response.data.id);
      let user = JSON.parse(localStorage.getItem("user"));
      localStorage.removeItem("user");
      user.entidade_id = response.data.id;

      await api.post(`/users/update/${user.id}`, JSON.stringify(user), config);
      setToMain(true);
    }
  }

  if (toMain) {
    return <Redirect to="/cadastro-finalizado" />;
  }

  return (
    <Container>
      <StepsRegister step={3} />
      <Form onSubmit={handleSubmitRegister}>
        <div className="mb-4 input-group">
          <span class="input-group-text" id="basic-addon1">
            <FaBuilding />
          </span>
          <input
            id="first_name"
            className="form-control"
            name="nome"
            type="text"
            autoComplete="off"
            placeholder="Nome da entidade"
          />
        </div>
        <div className="mb-4 input-group">
          <span class="input-group-text" id="basic-addon1">
            <FaAddressCard />
          </span>
          <input
            id="cnpj"
            className="form-control"
            name="cnpj"
            type="text"
            autoComplete="off"
            placeholder="CNPJ da entidade"
          />
        </div>
        <button
          type="submit"
          className="btn gradient-primary"
          style={{ width: "100%", fontSize: 20 }}
        >
          Concluir Cadastro
        </button>
      </Form>
    </Container>
  );
}

export default RegisterEntidade;
