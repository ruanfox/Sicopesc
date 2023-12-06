import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import { Redirect } from "react-router-dom";
import { cepMask } from "../../../Utils/Masks";

export default function Adress(props) {
  const [fisherAddresses, setFisherAddresses] = useState([]);
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [toLogin, setToLogin] = useState(false);
  const [ceps, setCeps] = useState([]);
  const [cep, setCep] = useState("");

  const states = {
    AC: "Acre",
    AL: "Alagoas",
    AP: "Amapá",
    AM: "Amazonas",
    BA: "Bahia",
    CE: "Ceará",
    DF: "Distrito Federal",
    ES: "Espírito Santo",
    GO: "Goiás",
    MA: "Maranhão",
    MT: "Mato Grosso",
    MS: "Mato Grosso do Sul",
    MG: "Minas Gerais",
    PA: "Pará",
    PB: "Paraíba",
    PR: "Paraná",
    PE: "Pernambuco",
    PI: "Piauí",
    RJ: "Rio de Janeiro",
    RN: "Rio Grande do Norte",
    RS: "Rio Grande do Sul",
    RO: "Rondônia",
    RR: "Roraima",
    SC: "Santa Catarina",
    SP: "São Paulo",
    SE: "Sergipe",
    TO: "Tocantins",
  };

  async function getFisherAddresses() {
    const id = props.match.params.id;

    try {
      const response = await api.get(`/pescadores/${id}/enderecos`);

      if (response.status === 200) {
        setFisherAddresses(response.data);
        const ceps = [];
        response.data.forEach((address) => {
          ceps.push(cepMask(address.cep));
        });
        setCeps(ceps);
      }
    } catch (e) {
      setToLogin(true);
    }

    setShowNewAddress(false);
  }

  useEffect(() => {
    async function getFisherAddresses() {
      const id = props.match.params.id;
      const response = await api.get(`/pescadores/${id}/enderecos`);

      if (response.status === 200) {
        setFisherAddresses(response.data);
        const ceps = [];
        response.data.forEach((address) => {
          ceps.push(cepMask(address.cep));
        });
        setCeps(ceps);
      }
      setShowNewAddress(false);
    }
    getFisherAddresses();
  }, [props.match.params.id]);

  useEffect(() => {
    if (fisherAddresses.length > 0) {
      const inputs = document.querySelectorAll("input");
      inputs.forEach((input) => {
        input.focus();
        input.blur();
      });
    }
  }, [fisherAddresses]);

  function cleanInputs() {
    document.getElementById("logradouro").value = "";
    document.getElementById("numero").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("estado").value = "";
    document.getElementById("cep").value = "";
  }

  async function updateAddress(e, id) {
    e.preventDefault();
    const data = {
      logradouro: e.target.logradouro.value,
      numero: e.target.numero.value,
      bairro: e.target.bairro.value,
      cidade: e.target.cidade.value,
      estado: e.target.estado.value,
      cep: e.target.cep.value.replace(/\D/g, ""),
    };
    const jsonData = JSON.stringify(data);

    const response = await api.put(`/enderecos/${id}`, jsonData);
    if (response.data.erro) {
      alert("erro " + response.data.erro);
    } else if (response.status === 200) {
      alert("Endereço atualizado!");
      getFisherAddresses();
    }
  }
  async function saveAddress(e) {
    e.preventDefault();
    const fisherId = props.match.params.id;
    const data = {
      logradouro: e.target.logradouro.value,
      numero: e.target.numero.value,
      bairro: e.target.bairro.value,
      cidade: e.target.cidade.value,
      estado: e.target.estado.value,
      cep: e.target.cep.value.replace(/\D/g, ""),
    };
    const jsonData = JSON.stringify(data);
    try {
      const response = await api.post(
        `/pescadores/${fisherId}/enderecos`,
        jsonData
      );
      if (response.data.erro) {
        alert("erro " + response.data.erro);
      } else if (response.status === 200) {
        alert("Endereço adicionado ao pescador!");
        getFisherAddresses();
      }
    } catch (e) {
      setToLogin(true);
    }
  }
  async function deleteAddress(id) {
    const response = await api.delete(`/enderecos/${id}`);
    if (response.data.erro) {
      alert("erro " + response.data.erro);
    } else if (response.status === 200) {
      alert("Endereço deletado!");
      getFisherAddresses();
    }
  }

  function handleClickAddAddress() {
    setShowNewAddress(true);
    cleanInputs();
  }

  if (toLogin) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      {fisherAddresses.map((address, index) => {
        return (
          <div className="card" key={address.id}>
            <div className="card-header">
              {" "}
              <h3>Endereço 0{index + 1}</h3>{" "}
            </div>
            <div className="card-body">
              <form onSubmit={(e) => updateAddress(e, address.id)}>
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor={"logradouro" + address.id}>
                      Logradouro
                    </label>
                    <input
                      id={"logradouro" + address.id}
                      name="logradouro"
                      type="text"
                      defaultValue={address.logradouro}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor={"numero" + address.id}>Numero</label>
                    <input
                      id={"numero" + address.id}
                      type="text"
                      name="numero"
                      defaultValue={address.numero}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-4 col-12">
                    <label htmlFor={"bairro" + address.id}>Bairro</label>
                    <input
                      id={"bairro" + address.id}
                      type="text"
                      name="bairro"
                      defaultValue={address.bairro}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor={"cidade" + address.id}>Cidade</label>
                    <input
                      id={"cidade" + address.id}
                      name="cidade"
                      type="text"
                      defaultValue={address.cidade}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor={"estado" + address.id}>Estado</label>
                    <select
                      defaultValue={address.estado}
                      name="estado"
                      id={"estado" + address.id}
                      className="form-select form-select-lg"
                    >
                      {Object.keys(states).map((sigla) => (
                        <option key={sigla} value={sigla}>
                          {sigla}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4 col-12">
                    <label htmlFor={"cep" + address.id}>CEP</label>
                    <input
                      id={"cep" + address.id}
                      type="text"
                      name="cep"
                      value={ceps[index]}
                      className="form-control"
                      onChange={(e) =>
                        setCeps([
                          ...ceps.slice(0, index),
                          cepMask(e.target.value),
                          ...ceps.slice(index + 1),
                        ])
                      }
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-4"></div>
                  <div className="col-md-4 col-12">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ width: "100%" }}
                    >
                      Atualizar Endereço
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      style={{ width: "100%", marginTop: 5 }}
                      onClick={() => deleteAddress(address.id)}
                    >
                      Excluir endereço
                    </button>
                  </div>
                  <div className="col-md-4"></div>
                </div>
              </form>
            </div>
          </div>
        );
      })}
      <div
        className="card mt-2"
        style={{ display: showNewAddress ? "block" : "none" }}
      >
        <div className="card-body">
          <form onSubmit={saveAddress}>
            <div className="row">
              <div className="col-md-4">
                <label htmlFor="logradouro">Logradouro</label>
                <input
                  id="logradouro"
                  name="logradouro"
                  className="form-control"
                  type="text"
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="numero">Numero</label>
                <input
                  id="numero"
                  type="text"
                  className="form-control"
                  name="numero"
                />
              </div>
              <div className="col-md-4 col-12">
                <label htmlFor="bairro">Bairro</label>
                <input
                  id="bairro"
                  className="form-control"
                  type="text"
                  name="bairro"
                />
              </div>
              <div className="input-field col-md-4">
                <label htmlFor="cidade">Cidade</label>
                <input
                  id="cidade"
                  className="form-control"
                  name="cidade"
                  type="text"
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="estado">Estado</label>
                <select
                  name="estado"
                  className="form-select form-select-lg"
                  id={"estado"}
                >
                  {Object.keys(states).map((sigla) => (
                    <option key={sigla} value={sigla}>
                      {sigla}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 col-12">
                <label htmlFor="cep">CEP</label>
                <input
                  id="cep"
                  type="text"
                  name="cep"
                  className="form-control"
                  value={cep}
                  onChange={(e) => setCep(cepMask(e.target.value))}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4 col-12">
                <button
                  type="submit"
                  className="btn btn-primary mt-3"
                  style={{ width: "100%" }}
                >
                  Salvar Endereço
                </button>
              </div>
              <div className="col-md-4"></div>
            </div>
          </form>
        </div>
      </div>
      <button
        className="btn btn-primary mt-2"
        onClick={handleClickAddAddress}
        style={{ display: showNewAddress ? "none" : "flex", width: 200 }}
      >
        Adicionar endereço
      </button>
    </div>
  );
}
