import React from "react";
import { LogoSiscol } from "../../LandPage/TopBar/styles";

import { Container, ImgFinished } from "./styles";

function RegisterFinished() {
  return (
    <Container>
      <LogoSiscol
        src={require("../../../assets/logo-dark.png")}
        alt="logo siscol"
      />
      <ImgFinished
        src={require("../assets/finished.svg")}
        alt="homem se sentido feliz"
      />
      <h1>Cadastro concluido com sucesso!</h1>
      <a href="/login" className="btn gradient-primary">
        Prosseguir para login
      </a>
    </Container>
  );
}

export default RegisterFinished;
