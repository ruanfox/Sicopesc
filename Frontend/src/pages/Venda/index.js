import React, { useState } from "react";
import {
  FaAddressCard,
  FaCalendarAlt,
  FaDollarSign,
  FaUser,
} from "react-icons/fa";
import ReactInputMask from "react-input-mask";
import { PulseLoader } from "react-spinners";
import api from "../../services/api";

import { Container } from "./styles";

function Venda(props) {
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState(0);
  const [descricao, setDescricao] = useState("");

  const [loadingRecibo, setLoadingRecibo] = useState(false);

  function handleSubmitGerarRecibo(e) {
    e.preventDefault();
    setLoadingRecibo(true);

    const formData = {
      cpf,
      nome,
      descricao,
      valor,
      tipo: props.tipo_caixa,
    };

    api
      .post("/recibo", formData)
      .then((response) => {
        props.history.push(`/recibo/${response.data.id}`);
      })
      .catch((e) => {
        // Mostrar erro para o usuário
        if (e.response?.data?.error) {
          alert(`Erro: ${e.response.data.error}`);
        } else {
          alert("Erro ao criar recibo. Verifique os dados e tente novamente.");
        }
      })
      .finally(() => {
        setLoadingRecibo(false);
      });
  }

  return (
    <Container className="container">
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmitGerarRecibo}>
            <div className="row">
              <div className="col-12 col-md-4 mt-3">
                <div className="input-group">
                  <label className="input-group-text">
                    <FaAddressCard />
                  </label>
                  <ReactInputMask
                    id="cpf"
                    mask="999.999.999-99"
                    className="form-control"
                    name="cpf"
                    type="text"
                    autoComplete="off"
                    placeholder={
                      props.tipo_caixa === "venda"
                        ? "CPF do comprador"
                        : "CPF do vendedor"
                    }
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="col-12 col-md-8 mt-3">
                <div className="input-group">
                  <label className="input-group-text">
                    <FaUser />
                  </label>
                  <input
                    id="nome"
                    className="form-control"
                    name="nome"
                    type="text"
                    autoComplete="off"
                    placeholder={
                      props.tipo_caixa === "venda"
                        ? "Nome do comprador"
                        : "Nome do vendedor"
                    }
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-10 mt-2">
                <div className="input-group">
                  <label className="input-group-text">
                    <FaCalendarAlt />
                  </label>
                  <input
                    id="descricao"
                    className="form-control"
                    name="descricao"
                    type="text"
                    autoComplete="off"
                    placeholder={
                      props.tipo_caixa === "venda"
                        ? "Descrição da venda, ex: 3kg de surubim"
                        : "Descrição da compra, ex: 3kg de surubim"
                    }
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="col-12 col-md-2 mt-2">
                <div className="input-group">
                  <label className="input-group-text" title="Valor da  guia">
                    <FaDollarSign />
                  </label>
                  <input
                    id="valor_inp_id"
                    className="form-control"
                    name="valor"
                    type="text"
                    title="Valor do recibo"
                    autoComplete="off"
                    placeholder="Valor"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row mb-2 mt-3">
              <div className="col-12 col-md-4"></div>
              <div className="col-12 col-md-4">
                <button
                  style={{ width: "100%", fontSize: 18 }}
                  type="submit"
                  className="btn btn-primary"
                >
                  {!loadingRecibo ? (
                    "Gerar recibo"
                  ) : (
                    <PulseLoader color="#fff" />
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default Venda;
