import styled from "styled-components";

export const Container = styled.div`
  width: 781px;
  margin: 0 auto;
  background: #ffffff;
  color: black;
  padding: 20px;
  border: 1px solid #ccc;
  font-family: times-new-roman;

  div.logo {
    disflay: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  div h3 {
    font-size: 10px;
  }

  div h4 {
    font-size: 12px;
    font-weight: bold;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-family: Arial, sans-serif;
    font-size: 14px;
  }

  th, td {
    border: 1px solid #444;
    padding: 6px 8px;
    vertical-align: top;
    text-align: left;
  }

  th.section {
    background: #ddd;
    font-weight: 700;
    text-align: center;
    font-size: 15px;
  }

  td.wide {
    width: 60%;
  }

  .notes {
    font-size: 12px;
    color: #333;
    padding: 8px;
    background: #f9f9f9;
  }

  input[type="checkbox"],
  input[type="radio"] {
    margin-right: 4px;
  }
`;
