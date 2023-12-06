import styled from "styled-components";

export const Container = styled.div``;

export const ReportStatusContainer = styled.div`
  height: 189px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 10px;
`;

export const ReportStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  label {
    font-size: 20px;
  }
  span {
    font-size: 22px;
    font-weight: bold;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.colors.primary};
  flex-direction: column;
  font-size: 18px;
  font-weight: bold;
  span {
    margin-bottom: 5px;
  }
`;

export const FilterWrapper = styled.div`
  display: flex;
`;
