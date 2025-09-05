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
  PortariaTitle,
  PortariaTexto,
  //ImgDocuments,
  Title,
} from "./styles";
import TopBar from "./TopBar";
import Footer from "../../layouts/AppLayout/footer";

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

        <FeatureWrapper style={{ marginTop: 150 }}>
          <FeatureImage
            style={{ marginRight: "10%" }}
            src={require("./assets/rafiki.svg")}
            alt="portaria"
          />
          <FeatureTextContainer>
            <FeatureTitle>Portaria</FeatureTitle>
            <FeatureDescription>
              <PortariaTitle href="https://www.in.gov.br/en/web/dou/-/portaria-conjur-mpa/mpa-n-4-de-13-de-novembro-de-2024-598827666">
                Portaria CONJUR - MPA/MPA nº 4, de 13 de novembro de 2024
              </PortariaTitle>
              <PortariaTexto>Estabelece as normas, os critérios e os procedimentos administrativos para o Registro Geral da Atividade Pesqueira na categoria de Pescador e Pescadora Profissional, para a concessão da Licença de Pescador e Pescadora Profissional.
              </PortariaTexto>

              <div style={{ width: '100%', margin: '0 auto', borderBottom: '5px solid #c4c4c4', marginBottom: '1.5rem' }} />

              <PortariaTitle href="https://www.in.gov.br/en/web/dou/-/portaria-mpa-n-127-de-29-de-agosto-de-2023-506365296">Portaria MPA nº 127, de 29 de agosto de 2023</PortariaTitle>
              <PortariaTexto>Estabelece as normas, os critérios e os procedimentos administrativos para o Registro Geral da Atividade Pesqueira na categoria de Pescador e Pescadora Profissional, para a concessão da Licença de Pescador e Pescadora Profissional.
              </PortariaTexto>

              <div style={{ width: '100%', margin: '0 auto', borderBottom: '5px solid #c4c4c4', marginBottom: '1.5rem' }} />

              <PortariaTitle href="https://www.gov.br/mpa/pt-br/assuntos/pesca/rede-pesca-brasil/banco-tecnico-cientifico/PORTARIA_SAP_MAPA_N__1095__DE_27_DE_JUNHO_DE_2022.pdf"> 
                PORTARIA SAP/MAPA Nº 1095, DE 27 DE JUNHO DE 2022
              </PortariaTitle>
              <PortariaTexto>Estabelece as normas, os critérios e os procedimentos administrativos para o Registro Geral da Atividade Pesqueira na categoria de Pescador e Pescadora Profissional, para a concessão da Licença de Pescador e Pescadora Profissional.
              </PortariaTexto>
              </FeatureDescription>
          </FeatureTextContainer>
        </FeatureWrapper>
        
      </ContainerFeatures>
      <Footer />
    </>
  );
}

export default LandPage;
