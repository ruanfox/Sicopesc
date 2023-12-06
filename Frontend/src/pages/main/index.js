import React, { useEffect } from "react";

import { ButtonAction, Container, Wrapper } from "./styles";
import api from "../../services/api";

export default function Main(props) {
  useEffect(() => {
    //para verificação de autenticação
    async function getTotalFiliados() {
      await api.get("/pescadores/registros/total");
    }
    getTotalFiliados();
  }, []);

  return (
    <Container>
      <Wrapper>
        <h1 className="text-center">O que deseja fazer?</h1>
        <div className="row">
          <div className="col-md-4 col-sm-12 d-flex justify-content-center mb-3">
            <ButtonAction
              delay={600}
              className="btn btn-primary"
              onClick={() => props.history.push("/anuidade")}
            >
              RECOLHIMENTO DE ANUIDADE
            </ButtonAction>
          </div>
          <div className="col-md-4 col-sm-12 d-flex justify-content-center mb-3">
            <ButtonAction
              delay={700}
              className="btn btn-primary"
              onClick={() => props.history.push("/pescador")}
            >
              VER PESCADORES
            </ButtonAction>
          </div>
          <div className="col-md-4 col-sm-12 d-flex justify-content-center">
            <ButtonAction
              delay={800}
              className="btn btn-primary"
              onClick={() => props.history.push("/caixa")}
            >
              VENDER/COMPRAR PESCADO
            </ButtonAction>
          </div>
        </div>
      </Wrapper>
    </Container>
  );
}
