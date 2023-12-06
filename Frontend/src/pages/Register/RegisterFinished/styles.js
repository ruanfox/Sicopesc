import styled from "styled-components";
import { ScaleMacAnimation } from "../../../styles/animations";

export const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fefefe;
  flex-direction: column;
  h1 {
    font-size: 2em;
    color: #4a4a4a;
    font-weight: 400;
    animation: ${ScaleMacAnimation} 400ms;
    animation-delay: 400ms;
    animation-fill-mode: backwards;
  }
  a {
    font-size: 20px;
    width: 380px;
    margin-top: 30px;
    animation: ${ScaleMacAnimation} 400ms;
    animation-delay: 800ms;
    animation-fill-mode: backwards;
  }
`;

export const ImgFinished = styled.img`
  max-width: 566px;
  margin-bottom: 30px;
  animation: ${ScaleMacAnimation} 400ms;
`;
