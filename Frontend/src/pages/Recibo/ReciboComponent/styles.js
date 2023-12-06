import styled from "styled-components";

export const Container = styled.div`
  h3 {
    margin: 0;
  }

  .text-justify {
    text-align: justify;
  }

  .card-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .info-recibo {
      display: flex;
      flex-direction: column;
    }
  }
`;
