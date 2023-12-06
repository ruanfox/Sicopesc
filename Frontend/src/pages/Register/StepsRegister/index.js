import React from "react";
import { FaAddressCard, FaBuilding, FaUser } from "react-icons/fa";

import {
  Container,
  Line,
  StepCircle,
  StepContainer,
  StepDescription,
} from "./styles";

function StepsRegister({ step = 1 }) {
  return (
    <Container>
      <StepContainer>
        <StepCircle active={step === 1} finished={step > 1}>
          <FaUser />
        </StepCircle>
        <StepDescription>1. Criação de Usuário</StepDescription>
      </StepContainer>
      <Line />
      <StepContainer>
        <StepCircle active={step === 2} finished={step > 2}>
          <FaAddressCard />
        </StepCircle>
        <StepDescription>2. Informações do representante</StepDescription>
      </StepContainer>
      <Line />
      <StepContainer>
        <StepCircle active={step === 3} finished={step > 3}>
          <FaBuilding />
        </StepCircle>
        <StepDescription>3. Informações da entidade</StepDescription>
      </StepContainer>
    </Container>
  );
}

export default StepsRegister;
