import styled, { keyframes } from "styled-components";
import { ScaleMacAnimation } from "../../styles/animations";

const FluctuateAnimation = keyframes`
  0%{
   transform: translatey(0);
  }50%{
    transform: translatey(-20px);
  }100%{
    transform: translatey(0);
  }
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: ${(props) => (props.height ? props.height + "px" : "100%")};
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: ${(props) =>
    `linear-gradient(${props.theme.colors.secondary}, ${props.theme.colors.primary})`};
  position: relative;
`;

export const ContainerFeatures = styled.div`
  display: flex;
  width: 100%;
  background: #fefefe;
  flex-direction: column;
  position: relative;
  min-height: ${(props) => (props.height ? props.height + "px" : "100%")};
`;

export const FeatureWrapper = styled.div`
  width: 90%;
  margin-left: 5%;
  margin-top: 70px;
  display: flex;
  justify-content: center;
  border-bottom: 5px solid #c4c4c4;
  flex-wrap: wrap;
`;

export const FeatureImage = styled.img`
  max-width: 280px;
  margin-bottom: 20px;
`;

export const FeatureTextContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 50%;
  max-width: 523px;
`;

export const FeatureTitle = styled.h2`
  font-size: 2em;
  color: #4a4a4a;
  font-weight: bold;
  margin-bottom: 40px;
`;

export const FeatureDescription = styled.p`
  font-size: 24px;
  color: #4a4a4a;
`;

export const ImgDocuments = styled.img`
  max-width: 50%;
  margin-bottom: 5%;
  animation: ${ScaleMacAnimation} 400ms;
  animation-delay: 400ms;
  animation-fill-mode: backwards;
`;

export const ButtonTry = styled.a`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  max-width: 331px;
  height: 50px;
  color: ${(props) => props.theme.colors.secondary};
  border-radius: 10px;
  font-size: 20px;
  animation: ${ScaleMacAnimation} 800ms;
  animation-delay: 1200ms;
  animation-fill-mode: backwards;
  text-decoration: none;
  background: #fff;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.secondary};
  }
`;

export const Title = styled.h1`
  font-size: 2.5em;
  width: 60%;
  text-align: center;
  margin-bottom: 2%;
  color: white;
  animation: ${ScaleMacAnimation} 800ms;
`;

export const Description = styled.span`
  font-size: 1.4em;
  width: 70%;
  margin-bottom: 5%;
  animation: ${ScaleMacAnimation} 400ms;
  animation-delay: 800ms;
  animation-fill-mode: backwards;
  text-align: center;
  color: white;
  max-width: 833px;
`;

export const SlideButton = styled.a`
  font-size: 40px;
  text-decoration: none;
  color: white;
  position: absolute;
  left: calc(50% - 15px);
  bottom: 30px;
  cursor: pointer;
  animation: ${FluctuateAnimation} 2s infinite;
  &:hover {
    color: white;
  }
`;
