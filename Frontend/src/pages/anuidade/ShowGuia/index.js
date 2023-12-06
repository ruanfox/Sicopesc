import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import timbre from "./assets/timbre.jpg";
import { dateFormat } from "../../../Utils";

import { Container } from "./styles";

export default function ShowGuia(props) {
  const [guia, setGuia] = useState({ pescador: { enderecos: [{}] } });

  useEffect(() => {
    async function loadGuia(id) {
      const guia = (await api.get(`/guias/${id}`)).data;
      setGuia(guia);
    }
    let idGuia = props.match.params.id;
    loadGuia(idGuia);
  }, [props.match.params.id]);
  return (
    <Container>
      <table className="guia">
        <tbody>
          <tr style={{ textAlign: "center" }}>
            <td colSpan="2" className="cabecalho">
              <img src={timbre} alt="timbre" />
              <span>
                COLÔNIA DOS PESCADORES E AQUICULTORES Z-16 CNPJ:
                06.864.244/0001-07
              </span>
              <br />
              <span>RUA BOAVENTURA SANTOS, Nº 01 – CENTRO</span>
              <br />
              <span>PEDRAS DE MARIA DA CRUZ – MG -CEP: 39.492-000</span>
              <br />
              <span>FONE: (38)3622:4115</span>
              <br />
              <span>Email: cpaz16@outlook.com</span>
              <br />
              <span>
                – GUIA DE RECOLHIMENTO DE ANUIDADE DE PESCADOR ARTESANAL –
              </span>
            </td>
          </tr>

          <tr>
            <td>RGP: {guia.pescador.rgp}</td>
            <td>Valor do documento: {guia.valor}</td>
          </tr>
          <tr>
            <td>
              Nome: <span className="end"> {guia.pescador.nome}</span>
            </td>
            <td>Vencimento: </td>
          </tr>
          <tr>
            <td>
              Endereço:
              <span className="end">
                {guia.pescador.enderecos[0]
                  ? guia.pescador.enderecos[0].logradouro
                  : ""}
                , N°
                {guia.pescador.enderecos[0]
                  ? guia.pescador.enderecos[0].numero
                  : ""}
              </span>
            </td>
            <td>Agência-código cedente: </td>
          </tr>
          <tr>
            <td>
              Cidade:{" "}
              {guia.pescador.enderecos[0]
                ? guia.pescador.enderecos[0].cidade
                : ""}
            </td>
            <td>Conta:</td>
          </tr>
          <tr>
            <td>Ano de Referência: {guia.ano}</td>
            <td>Multa e/ou Juros:</td>
          </tr>
          <tr>
            <td>
              <span className="end"></span>
            </td>
            <td>Total: {guia.valor}</td>
          </tr>
          <tr>
            <td colSpan="2" className="banco">
              <span style={{ fontWeight: "bold" }}>BANCO</span>
              <span className="data">
                Data pagamento: {dateFormat(guia.data_emissao)}
              </span>
              <span className="autentica">Autenticação mecânica</span>
            </td>
          </tr>
        </tbody>
      </table>
      <table className="guia">
        <tbody>
          <tr style={{ textAlign: "center" }}>
            <td colSpan="2" className="cabecalho">
              <img src={timbre} alt="timbre" />
              <span>
                COLÔNIA DOS PESCADORES E AQUICULTORES Z-16 CNPJ:
                06.864.244/0001-07
              </span>
              <br />
              <span>RUA BOAVENTURA SANTOS, Nº 01 – CENTRO</span>
              <br />
              <span>PEDRAS DE MARIA DA CRUZ – MG -CEP: 39.492-000</span>
              <br />
              <span>FONE: (38)3622:4115</span>
              <br />
              <span>Email: cpaz16@outlook.com</span>
              <br />
              <span>
                – GUIA DE RECOLHIMENTO DE ANUIDADE DE PESCADOR ARTESANAL –
              </span>
            </td>
          </tr>

          <tr>
            <td>RGP: {guia.pescador.rgp}</td>
            <td>Valor do documento: {guia.valor}</td>
          </tr>
          <tr>
            <td>
              Nome: <span className="end"> {guia.pescador.nome}</span>
            </td>
            <td>Vencimento: </td>
          </tr>
          <tr>
            <td>
              Endereço:
              <span className="end">
                {guia.pescador.enderecos[0]
                  ? guia.pescador.enderecos[0].logradouro
                  : ""}
                , N°
                {guia.pescador.enderecos[0]
                  ? guia.pescador.enderecos[0].numero
                  : ""}
              </span>
            </td>
            <td>Agência-código cedente: </td>
          </tr>
          <tr>
            <td>
              Cidade:{" "}
              {guia.pescador.enderecos[0]
                ? guia.pescador.enderecos[0].cidade
                : ""}
            </td>
            <td>Conta:</td>
          </tr>
          <tr>
            <td>Ano de Referência: {guia.ano}</td>
            <td>Multa e/ou Juros:</td>
          </tr>
          <tr>
            <td>
              <span className="end"></span>
            </td>
            <td>Total: {guia.valor}</td>
          </tr>
          <tr>
            <td colSpan="2" className="banco">
              <span style={{ fontWeight: "bold" }}>BANCO</span>
              <span className="data">
                Data pagamento: {dateFormat(guia.data_emissao)}
              </span>
              <span className="autentica">Autenticação mecânica</span>
            </td>
          </tr>
        </tbody>
      </table>
      <button className="btn btn-primary btn-guia" onClick={window.print}>
        IMPRIMIR
      </button>
    </Container>
  );
}
