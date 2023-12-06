import styled from "styled-components";
import { ScaleMacAnimation } from "../../styles/animations";

export const Container = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const LoginBox = styled.div`
  display: flex;
  justify-content: space-between;
  height: 450px;
  border-radius: 8px;
  box-shadow: 0 0 1px black;
  background: rgba(255, 255, 255, 1);
  backdrop-filter: blur(4px);
  animation: fade 400ms;
  animation-fill-mode: backwards;
  animation-delay: 200ms;
`;

export const SideBox = styled.div`
  display: flex;
  width: 250px;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  box-shadow: 0 0 1px black;
  padding: 10px;
  color: #fff;
  span {
    font-size: 20px;
    text-align: center;
    a {
      color: #682ab5;
    }
  }
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  max-width: 400px;
  height: 80%;
  animation: ${ScaleMacAnimation} 400ms;
`;
