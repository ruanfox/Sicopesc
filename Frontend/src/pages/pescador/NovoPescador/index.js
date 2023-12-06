import React, { useState, useEffect } from "react";

import api from "../../../services/api";

import { Redirect } from "react-router-dom";
import { cpfMask, nitMask, ceiMask } from "../../../Utils/Masks";
import { formatDate } from "../../../Utils";

export default function NovoPescador(props) {
  const [toAddress, setToAddress] = useState(false);
  const [id, setId] = useState(null);
  const [cpf, setCpf] = useState("");
  const [nit, setNit] = useState("");
  const [cei, setCei] = useState("");
  const [fisher, setFisher] = useState({});
  const [nascimento, setNascimento] = useState("");
  const [primeiroRgp, setPrimeiroRgp] = useState("");
  const [emissaoRgp, setEmissaoRgp] = useState("");
  const [filiacao, setFiliacao] = useState("");
  const [toLogin, setToLogin] = useState(false);

  useEffect(() => {
    const fisherId = props.match.params.id;

    async function getFisher(fisherId) {
      try {
        const response = await api.get("/pescadores/" + fisherId);
        setFisher(response.data);
        setCpf(cpfMask(response.data.cpf));
        setCei(ceiMask(response.data.cei));
        setNit(nitMask(response.data.nit));
        setNascimento(formatDate(response.data.nascimento));
        setPrimeiroRgp(formatDate(response.data.data_do_primeiro_rgp));
        setFiliacao(formatDate(response.data.data_de_filiacao));
        setEmissaoRgp(formatDate(response.data.data_de_emissao_rgp));
      } catch (e) {
        setToLogin(true);
      }

      const inputs = document.querySelectorAll("input");
      inputs.forEach((input) => {
        input.focus();
        input.blur();
      });
    }

    if (fisherId) {
      setId(fisherId);
      getFisher(fisherId);
    }
  }, [props.match.params.id]);

  function handleSubmitForm(e) {
    e.preventDefault();
    if (!id) addFisher(e);
    else updateFisher(e);
  }
  async function addFisher(e) {
    const data = {
      nome: e.target.nome.value.toUpperCase(),
      cpf: e.target.cpf.value.replace(/\D/g, ""),
      rg: e.target.rg.value.toUpperCase(),
      nascimento: e.target.nascimento.value,
      rgp: e.target.rgp.value.toUpperCase(),
      data_de_emissao_rgp: e.target.data_de_emissao_rgp.value,
      data_do_primeiro_rgp: e.target.data_do_primeiro_rgp.value,
      titulo: e.target.titulo.value.replace(/\D/g, ""),
      data_de_filiacao: e.target.data_de_filiacao.value,
      nit: e.target.nit.value.replace(/\D/g, ""),
      cei: e.target.cei.value.replace(/\D/g, ""),
    };
    const jsonData = JSON.stringify(data);
    try {
      const response = await api.post("/pescadores", jsonData);

      if (response.data.erro) {
        alert("erro " + response.data.erro);
      } else if (response.status === 200) {
        alert("Pescador cadastrado no sistema!");
        setId(response.data.id);
        setToAddress(true);
      }
    } catch (e) {
      setToLogin(true);
    }
  }
  async function updateFisher(e) {
    const data = {
      nome: e.target.nome.value.toUpperCase(),
      cpf: e.target.cpf.value.replace(/\D/g, ""),
      rg: e.target.rg.value.toUpperCase(),
      nascimento: e.target.nascimento.value,
      rgp: e.target.rgp.value.toUpperCase(),
      data_de_emissao_rgp: e.target.data_de_emissao_rgp.value,
      data_do_primeiro_rgp: e.target.data_do_primeiro_rgp.value,
      titulo: e.target.titulo.value.replace(/\D/g, ""),
      data_de_filiacao: e.target.data_de_filiacao.value,
      nit: e.target.nit.value.replace(/\D/g, ""),
      cei: e.target.cei.value.replace(/\D/g, ""),
    };
    const jsonData = JSON.stringify(data);

    try {
      let response = await api.put(`/pescadores/${id}`, jsonData);
      if (response.data.updated) {
        alert("Informações do pescador foram atualizadas!");
        setToAddress(true);
      } else {
        alert("erro " + response.data.erro);
      }
    } catch (e) {
      setToLogin(true);
    }
  }

  if (toAddress) {
    return <Redirect to={`/novo-pescador/endereco/${id}`} />;
  }
  if (toLogin) {
    //return <Redirect to="/login" />;
  }
  return (
    <div className="container">

      <div className="card">
        <div className="card-body">
        <form onSubmit={handleSubmitForm}>
          <div className="row mt-2">
            <div className="col-12 col-md-6">
              <label htmlFor="nome">Nome</label>
              <input
                id="nome"
                name="nome"
                type="text"
                className="form-control"
                defaultValue={fisher.nome}
              />
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="nascimento">Data de nascimento</label>
              <input
                id="nascimento"
                name="nascimento"
                type="date"
                defaultValue={nascimento}
                className="form-control"
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-12 col-md-4">
              <label htmlFor="cpf">CPF</label>
              <input
                id="cpf"
                type="text"
                name="cpf"
                value={cpf}
                onChange={(e) => setCpf(cpfMask(e.target.value))}
                className="form-control"
              /> 
            </div>
            <div className="col-12 col-md-4">
              <label htmlFor="rg">RG</label>
              <input
                id="rg"
                type="text"
                maxLength={15}
                defaultValue={fisher.rg}
                className="form-control"
              />
            </div>
            <div className="col-12 col-md-4">
              <label htmlFor="rgp">RGP</label>
              <input
                id="rgp"
                type="text"
                name="rgp"
                maxLength={15}
                defaultValue={fisher.rgp}
                className="form-control"
              />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-12 col-md-4">
              <label htmlFor="data_de_emissao_rgp">Data de emissão RGP</label>
              <input
                id="data_de_emissao_rgp"
                name="data_de_emissao_rgp"
                type="date"
                defaultValue={emissaoRgp}
                className="form-control"
              />
            </div>
            <div className="col-12 col-md-4">
              <label htmlFor="data_do_primeiro_rgp">Data do primeiro RGP</label>
              <input
                id="data_do_primeiro_rgp"
                type="date"
                name="data_do_primeiro_rgp"
                defaultValue={primeiroRgp}
                className="form-control"
              />
            </div>
            <div className="col-12 col-md-4">
              <label htmlFor="data_de_filiacao">Data de filiação</label>
              <input
                id="data_de_filiacao"
                type="date"
                name="data_de_filiacao"
                defaultValue={filiacao}
                className="form-control"
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-12 col-md-4">
              <label htmlFor="titulo">Titulo</label>
              <input
                id="titulo"
                name="titulo"
                type="text"
                maxLength={15}
                defaultValue={fisher.titulo}
                className="form-control"
              />
            </div>
            <div className="col-12 col-md-4">
            <label htmlFor="nit">NIT</label>
              <input
                id="nit"
                type="text"
                name="nit"
                defaultValue={fisher.nit}
                value={nit}
                onChange={(e) => setNit(nitMask(e.target.value))}
                className="form-control"
              />
            </div>
            <div className="col-12 col-md-4">
              <label htmlFor="cei">CEI</label>
              <input
                id="cei"
                type="text"
                name="cei"
                defaultValue={fisher.cei}
                value={cei}
                onChange={(e) => setCei(ceiMask(e.target.value))}
                className="form-control"
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-12 col-md-4"></div>
            <div className="col-12 col-md-4">
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%" }}
              >
                Próximo
              </button>
            </div>
            <div className="col-12 col-md-4"></div>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}
