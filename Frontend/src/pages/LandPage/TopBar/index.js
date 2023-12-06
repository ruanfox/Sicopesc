import React from "react";

import { ButtonTopBar, Container, LogoSiscol } from "./styles";

function TopBar({ active, lightMode = false }) {
  return (
    <>
      <LogoSiscol
        src={
          lightMode
            ? require("../../../assets/logo-branca.png")
            : require("../../../assets/logo-dark.png")
        }
        alt="logo siscol"
      />
      <Container>
        <ButtonTopBar
          lightMode={lightMode}
          active={active === "inicio"}
          href="#inicio"
        >
          Início
        </ButtonTopBar>
        <ButtonTopBar
          href="#recursos"
          lightMode={lightMode}
          active={active === "recursos"}
        >
          Recursos
        </ButtonTopBar>
        <ButtonTopBar lightMode={lightMode} href="/login">
          Entrar
        </ButtonTopBar>
      </Container>
    </>
  );
}

export default TopBar;
