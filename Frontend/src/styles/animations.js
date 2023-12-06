import { keyframes } from "styled-components";

export const ScaleMacAnimation = keyframes`
  from {
    transform: scale(1.2);
    opacity: 0;
  }to{
    transform: scale(1);
    opacity: 1;
  }
`;

export const OpacityAnimation = keyframes`
  from {
    opacity: 0;
  }to{
    opacity: 1;
  }
`;

export const OpacityHideAnimation = keyframes`
  from {
    opacity: 1;
  }to{
    opacity: 0;
  }
`;
