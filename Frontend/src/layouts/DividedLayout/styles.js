import styled from "styled-components";
import { ScaleMacAnimation } from "../../styles/animations";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  background: linear-gradient(
    ${(props) => props.theme.colors.secondary},
    ${(props) => props.theme.colors.primary}
  );
`;

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100%;
`;

export const ContentContainer = styled.div`
  width: 50%;
  height: 100%;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  background: #fefefe;
`;

export const Description = styled.h1`
  font-size: 1.6em;
  color: white;
  font-weight: 400;
  animation: ${ScaleMacAnimation} 400ms;
  width: 70%;
  max-width: 600px;
`;

export const Logo = styled.img`
  position: absolute;
  top: 21px;
  left: 0;
  width: 153px;
  height: 81px;
`;

export const ButtonLogin = styled.a`
  text-decoration: none;
  background: white;
  color: ${(props) => props.theme.colors.primary};
  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
  margin-top: 50px;
  width: 50% !important;
  font-size: 20px;
  max-width: 331px;
  display: ${(props) => (props.showLogin ? "flex" : "none")}!important;
`;
