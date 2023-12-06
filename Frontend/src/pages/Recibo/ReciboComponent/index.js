import React, { useEffect, useState } from "react";

import { Container } from "./styles";

function ReciboComponent({ recibo, style = {} }) {
  const [dataRecibo, setDataRecibo] = useState(new Date());
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  useEffect(() => {
    if (recibo?.createdAt) {
      setDataRecibo(new Date(recibo.createdAt));
    }
  }, [recibo]);
  return (
    <Container className="card" style={style}>
      <div className="card-header">
        <h3> RECIBO</h3>
        <div className="info-recibo">
          <span>N°: {recibo?.id}</span>
          <span>
            Valor:{" "}
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(recibo?.valor.numero)}
          </span>
        </div>
      </div>
      <div className="card-body">
        {recibo?.tipo === "venda" ? (
          <p className="text-justify">
            A <span className="text-uppercase">{recibo?.entidade?.nome}</span>,
            Portadora do CNPJ
            {" " +
              recibo?.entidade?.cnpj.replace(
                /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
                "$1.$2.$3/$4-$5"
              )}
            , por meio de seu representante{" "}
            {recibo?.entidade?.responsavel?.nome.toUpperCase()}, declara ter
            recebido a quantia de:{" "}
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(recibo?.valor.numero)}{" "}
            (<span className="text-uppercase">{recibo?.valor.por_extenso}</span>
            ) de <span className="text-uppercase">{recibo?.nome}</span>,
            {recibo?.cpf && `Portador(a) do CPF ${recibo?.cpf},`} REFERENTE À
            VENDA DE <span className="text-uppercase">{recibo?.descricao}</span>
            .
          </p>
        ) : (
          <p className="text-justify">
            Eu, <span className="text-uppercase">{recibo?.nome}</span>{" "}
            Portador(a) do CPF {recibo?.cpf}, Declaro ter recebido nesta data a
            quantia de:{" "}
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(recibo?.valor.numero)}
            (<span className="text-uppercase">{recibo?.valor.por_extenso}</span>
            ) da {recibo?.entidade?.nome.toUpperCase()} Portadora do CNPJ{" "}
            {" " +
              recibo?.entidade?.cnpj.replace(
                /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
                "$1.$2.$3/$4-$5"
              )}{" "}
            REFERENTE À VENDA DE{" "}
            <span className="text-uppercase">{recibo?.descricao}</span>
          </p>
        )}
        <p className="text-left">E para maior clareza, afirmo o presente.</p>
        <p className="text-center">
          _____________________________________________,{" "}
          {`${dataRecibo.getDate()} de ${
            meses[dataRecibo.getMonth()]
          } de ${dataRecibo.getFullYear()}`}
          .
        </p>
        <p className="text-center" style={{ marginTop: -20, marginRight: 70 }}>
          Local
        </p>
        <p className="text-center">
          __________________________________________________________
        </p>
        <p className="text-center text-uppercase" style={{ marginTop: -20 }}>
          {recibo?.tipo === "venda"
            ? recibo?.entidade?.responsavel?.nome
            : recibo?.nome}
          (Assinatura)
        </p>
      </div>
    </Container>
  );
}

export default ReciboComponent;
