import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import { dateFormat } from "../../../Utils";
import { Container } from "./styles";

export default function FisherInfo(props) {
  const [fisher, setFisher] = useState({});
  const [addresses, setAddresses] = useState([]);

  const fisherId = props.match.params.id;

  useEffect(() => {
    async function getFisher() {
      const res = await api.get(`/pescadores/${fisherId}`);
      const res2 = await api.get(`/pescadores/${fisherId}/enderecos`);
      setFisher(res.data);
      setAddresses(res2.data);
    }
    getFisher();
  }, [fisherId]);

  return (
    <Container className="container">
      <h2 className="text-center">{fisher.nome}</h2>
      <div className="row">
        <div className="col-12">
          <h3
            className="wrapper-rounded  text-center"
            style={{ fontWeight: "bold" }}
          >
            Informações pessoais
          </h3>
        </div>

        <div className="col-lg-3 col-md-4 col-6">
          <div className="wrapper-rounded">
            <span className="title">RG: </span>
            <br />
            <span>{fisher.rg}</span>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-6">
          <div className="wrapper-rounded">
            <span className="title">RGP: </span>
            <br />
            <span>{fisher.rgp}</span>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-6">
          <div className="wrapper-rounded">
            <span className="title">CPF: </span>
            <br />
            <span>{fisher.cpf}</span>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-6">
          <div className="wrapper-rounded">
            <span className="title">Data de nascimento: </span>
            <br />
            <span>{dateFormat(fisher.nascimento)}</span>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-6">
          <div className="wrapper-rounded">
            <span className="title">Emissão do RGP: </span>
            <br />
            <span>{dateFormat(fisher.data_de_emissao_rgp)}</span>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-6">
          <div className="wrapper-rounded">
            <span className="title">Primeiro RGP: </span>
            <br />
            <span>{dateFormat(fisher.data_do_primeiro_rgp)}</span>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-6">
          <div className="wrapper-rounded">
            <span className="title">Data de filiação: </span>
            <br />
            <span>{dateFormat(fisher.data_de_filiacao)}</span>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-6">
          <div className="wrapper-rounded">
            <span className="title">Titulo de eleitor: </span>
            <br />
            <span>{fisher.titulo}</span>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-6">
          <div className="wrapper-rounded">
            <span className="title">NIT: </span>
            <br />
            <span>{fisher.nit}</span>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-6">
          <div className="wrapper-rounded">
            <span className="title">CEI: </span>
            <br />
            <span>{fisher.cei}</span>
          </div>
        </div>
      </div>
      {addresses.map((address, i) => {
        return (
          <div className="row mt-2" key={i}>
            <div className="col-12">
              <h3
                className="wrapper-rounded text-center"
                style={{ fontWeight: "bold" }}
              >
                Endereço 0{i + 1}
              </h3>
            </div>
            <div className="col-lg-3 col-md-4 col-6">
              <div className="wrapper-rounded">
                <span className="title">Logradouro: </span>
                <br />
                <span>{address.logradouro}</span>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-6">
              <div className="wrapper-rounded">
                <span className="title">Número: </span>
                <br />
                <span>{address.numero}</span>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-6">
              <div className="wrapper-rounded">
                <span className="title">Bairro: </span>
                <br />
                <span>{address.bairro}</span>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-6">
              <div className="wrapper-rounded">
                <span className="title">Cidade: </span>
                <br />
                <span>{address.cidade}</span>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-6">
              <div className="wrapper-rounded">
                <span className="title">Estado: </span>
                <br />
                <span>{address.estado}</span>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-6">
              <div className="wrapper-rounded">
                <span className="title">CEP: </span>
                <br />
                <span>{address.cep}</span>
              </div>
            </div>
          </div>
        );
      })}
    </Container>
  );
}
