import React, { useEffect, useState } from "react";
import M from "materialize-css";
import Select from "react-select/async";
import { Container } from "./styles";
import { MdToday, MdPayment } from "react-icons/md";
import { Redirect } from "react-router-dom";
import api from "../../../services/api";

function NewGuia() {
  const [pescadorId, setPescadorId] = useState(null);
  const [ano, setAno] = useState(2020);
  const [valor, setValor] = useState(200);

  const [guiaId, setGuiaId] = useState(null);
  const [toShowGuia, setToShowGuia] = useState(false);

  useEffect(() => {
    const modals = document.querySelectorAll(".modal");
    M.Modal.init(modals, { opacity: 0.5 });
  }, []);

  async function handleClickGerarGuia() {
    if (pescadorId) {
      const data = {
        valor,
        data_emissao: Date.now(),
        ano,
      };
      const jsonData = JSON.stringify(data);
      const response = await api.post(
        `/pescadores/${pescadorId}/guias`,
        jsonData
      );
      const { id } = response.data;
      setGuiaId(id);
      setToShowGuia(true);
    }
  }

  function resetInputs() {
    setPescadorId(null);
  }

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: state.isSelected ? "red" : "blue",
      padding: 10,
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: "100%",
      background: "#fff",
      display: "flex",
      height: 50,
      borderBottom: "1px solid blue",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  async function loadOptions(inputValue, callback) {
    const fishers = (await api.get(`/pescadores/nome/${inputValue}`)).data
      .pescadores;
    const options = [];
    if (Array.isArray(fishers)) {
      fishers.forEach((fisher) => {
        options.push({ label: fisher.nome, value: fisher.id });
      });
    }

    callback(options);
  }

  if (toShowGuia && guiaId) {
    return <Redirect to={`/ver-guia/${guiaId}`} />;
  }

  return (
    <Container id="modalNewGuia" className="modal">
      <h2>Nova Anuidade</h2>

      <div className="modal-content">
        <div className="row">
          <div className="input-field col s12">
            <Select
              cacheOptions
              loadOptions={loadOptions}
              styles={customStyles}
              defaultOptions
              onChange={(option) => setPescadorId(option.value)}
              placeholder={"Pescador"}
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12 m6">
            <MdToday className="prefix" />
            <input
              name="ano"
              type="number"
              placeholder="ano"
              id="ano"
              value={ano}
              onChange={(e) => setAno(e.target.value)}
            />
          </div>
          <div className="input-field col s12 m6">
            <MdPayment className="prefix" />
            <input
              name="valor"
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="valor"
            />
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <a
          href="#!"
          className="modal-close waves-effect btn-flat"
          onClick={resetInputs}
        >
          Cancelar
        </a>
        <button
          className="waves-effect btn primary"
          onClick={handleClickGerarGuia}
        >
          Gerar guia
        </button>
      </div>
    </Container>
  );
}

export default NewGuia;
