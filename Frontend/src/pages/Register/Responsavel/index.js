import React from "react";

import { Container } from "./styles";
import { Form } from "../styles";

import api from "../../../services/api";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { FaUser, FaAddressCard, FaPhone } from "react-icons/fa";
import StepsRegister from "../StepsRegister";

import { cpfMask } from "../../../Utils/Masks";

function RegisterResponsavel() {
  const [toEntidade, setToEntidade] = useState(false);
  const [cpf, setCpf] = useState("");

  async function handleSubmitRegister(e) {
    e.preventDefault();
    const data = {
      nome: e.target.nome.value,
      cpf: cpf.replace(".", "").replace(".", "").replace("-", ""),
      telefone: e.target.telefone.value,
    };

    const jsonData = JSON.stringify(data);
    const token = localStorage.getItem("_token");
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.post("/responsaveis/store", jsonData, config);
    if (response.status === 200) {
      localStorage.setItem("responsavel_id", response.data.id);
      setToEntidade(true);
    }
  }

  if (toEntidade) {
    return <Redirect to="/register/entidade" />;
  }

  return (
    <Container>
      <StepsRegister step={2} />
      <Form onSubmit={handleSubmitRegister}>
        <div className="mb-4 input-group">
          <span class="input-group-text" id="basic-addon1">
            <FaUser />
          </span>
          <input
            className="form-control"
            id="first_name"
            name="nome"
            type="text"
            autoComplete="off"
            placeholder="Nome"
          />
        </div>
        <div className="mb-4 input-group">
          <span class="input-group-text" id="basic-addon1">
            <FaAddressCard />
          </span>
          <input
            className="form-control"
            id="cpf"
            name="cpf"
            type="text"
            autoComplete="off"
            value={cpf}
            onChange={(e) => setCpf(cpfMask(e.target.value))}
            placeholder="CPF"
          />
        </div>
        <div className="mb-4 input-group">
          <span class="input-group-text" id="basic-addon1">
            <FaPhone />
          </span>
          <input
            className="form-control"
            id="telefone"
            name="telefone"
            type="text"
            placeholder="Telefone"
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

export default RegisterResponsavel;
