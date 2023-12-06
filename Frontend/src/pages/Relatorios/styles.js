import styled from "styled-components";
import { ScaleMacAnimation } from "../../styles/animations";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ReportButton = styled.a`
  width: 45% !important;
  height: 150px !important;
  font-size: 1.2em;
  position: relative;
  background: #fefefe;
  border: 1px solid rgba(0, 0, 0, 0.2);
  animation: ${ScaleMacAnimation} 400ms;
  animation-delay: ${(props) => (props.delay ? props.delay : 0)}ms;
  animation-fill-mode: backwards;
  img {
    position: relative;
    left: 0px;
    max-width: 136px;
    max-height: 100%;
    margin-right: 5px;
  }
`;
