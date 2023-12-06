import React from "react";

import {
  Container,
  Description,
  Logo,
  LeftContainer,
  ContentContainer,
  ButtonLogin,
  DescriptionContainer,
} from "./styles";

function LandPageLayout({
  children,
  description,
  history,
  showBtnLogin = false,
}) {
  return (
    <Container>
      <LeftContainer>
        <Logo src={require("../../assets/logo-branca.png")} alt="logo siscol" />

        <DescriptionContainer>
          <Description>{description}</Description>
          <ButtonLogin
            showLogin={showBtnLogin}
            href="/login"
            className="btn border-radius"
          >
            Já possuo login
          </ButtonLogin>
        </DescriptionContainer>
      </LeftContainer>

      <ContentContainer>{children}</ContentContainer>
    </Container>
  );
}

export default LandPageLayout;
