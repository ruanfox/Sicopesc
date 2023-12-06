import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import {
  ButtonTry,
  Container,
  ContainerFeatures,
  Description,
  FeatureDescription,
  FeatureImage,
  FeatureTextContainer,
  FeatureTitle,
  FeatureWrapper,
  SlideButton,
  //ImgDocuments,
  Title,
} from "./styles";
import TopBar from "./TopBar";

function LandPage() {
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);
  return (
    <>
      <Container height={windowHeight} id="inicio">
        <TopBar active="inicio" lightMode />
        <Title>Bem vindo(a) ao SISCOL!</Title>
        <Description>
          O SISCOL é um sistema completo para gestão da sua colônia de
          pescadores. Tenha total controle sobre seus afiliados de forma simples
          e segura!
        </Description>
        <ButtonTry href="/login">Experimente já</ButtonTry>
        <SlideButton href="#recursos">
          <FaAngleDown />
        </SlideButton>
      </Container>
      <ContainerFeatures id="recursos" height={windowHeight}>
        <TopBar active="recursos" />
        <FeatureWrapper
          style={{ marginTop: 150, flexDirection: "row-reverse" }}
        >
          <FeatureImage
            style={{ marginLeft: "10%" }}
            src={require("./assets/bro.svg")}
          />
          <FeatureTextContainer>
            <FeatureTitle>Recolhimento de anuidade</FeatureTitle>
            <FeatureDescription>
              No SISCOL você pode facilmente gerar guias de recolhimento de
              anuidade/mensalidade dos seus filiados. Além disso é possível
              buscar e tirar 2ª via das guias.
            </FeatureDescription>
          </FeatureTextContainer>
        </FeatureWrapper>

        <FeatureWrapper style={{ marginTop: 150 }}>
          <FeatureImage
            style={{ marginRight: "10%" }}
            src={require("./assets/amico.svg")}
            alt="finanças"
          />
          <FeatureTextContainer>
            <FeatureTitle>Compra e venda facilitada!</FeatureTitle>
            <FeatureDescription>
              Com o SISCOL você pode controlar toda a venda e compra de pescado
              da sua colônia de forma simples e intuitiva.
            </FeatureDescription>
          </FeatureTextContainer>
        </FeatureWrapper>
      </ContainerFeatures>
    </>
  );
}

export default LandPage;
