import React from "react";

import { ReportButton, Container } from "./styles";

function Relatorios() {
  return (
    <Container className="container">
      <ReportButton className="btn" href="/relatorios/anuidade" delay={200}>
        <img src={require("./assets/audit-bro.svg")} alt="relatório" />
        Relatório de recolhimento de anuidade
      </ReportButton>
      <ReportButton className="btn" href="/relatorios/caixa" delay={500}>
        <img src={require("./assets/audit-amico.svg")} alt="relatório" />
        Relatório de compra e venda
      </ReportButton>
    </Container>
  );
}

export default Relatorios;
