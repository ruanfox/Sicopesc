import styled from "styled-components";
import { ScaleMacAnimation } from "../../styles/animations";


export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100% - 100px);
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  flex-direction: column;
  top: 0;
  left: 0;
  padding-bottom: 100px;
  h1 {
    font-size: 72px;
    margin: 0px 0 80px 0;
    animation: ${ScaleMacAnimation} 500ms;
    animation-fill-mode: backwards;
  }
  .btn {
    width: 100%;
    height: 140px;
    font-size: 24px;
    font-weight: bold;
  }
`;

export const ButtonAction = styled.button`
  animation: ${ScaleMacAnimation} 500ms;
  animation-fill-mode: backwards;
  animation-delay: ${(props) => (props.delay ? props.delay + "ms" : "600ms")};
`;
