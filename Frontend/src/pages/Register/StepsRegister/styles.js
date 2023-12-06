import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  position: absolute;
  top: 6%;
  align-items: center;
`;

export const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StepCircle = styled.div`
  width: 50px;
  height: 50px;
  background: ${(props) =>
    props.active
      ? props.theme.colors.primary
      : props.finished
      ? props.theme.colors.success
      : "#c4c4c4"};
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.4s;
`;

export const StepDescription = styled.span`
  font-size: 11px;
  color: ${(props) => props.theme.colors.primary};
  margin-top: 5px;
  text-align: center;
`;

export const Line = styled.div`
  height: 1px;
  width: 107px;
  max-width: 107px;
  width: 60px;
  background: #4a4a4a;
  margin: 0 5px;
`;
