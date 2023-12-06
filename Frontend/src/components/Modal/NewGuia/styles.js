import styled from "styled-components";

export const Container = styled.div`
  border-radius: 5px;
  padding: 20px;
`;

export const ListFisher = styled.ul`
  display: ${(props) => (props.show ? "block" : "none")};
  position: absolute;
  text-align: center;
  border: 1px solid #9e9e9e;
  margin-left: 7%;
  margin-top: -222px;
  width: 80%;
  background: #fff;
`;
export const ListItem = styled.li`
  cursor: pointer;
  &:hover {
    background: rgba(104, 42, 181, 0.4);
  }
`;
