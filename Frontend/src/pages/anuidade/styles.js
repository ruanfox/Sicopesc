import styled from "styled-components";
import { ScaleMacAnimation } from "../../styles/animations";

export const Container = styled.div`
  .card {
    animation: ${ScaleMacAnimation} 400ms;
    animation-delay: 400ms;
    animation-fill-mode: backwards;
  }
  .table {
    animation: ${ScaleMacAnimation} 400ms;
    animation-delay: 800ms;
    animation-fill-mode: backwards;
  }
`;
export const FormSearch = styled.form`
  animation: ${ScaleMacAnimation} 400ms;
`;
