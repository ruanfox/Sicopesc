import styled from "styled-components";

export const Container = styled.div`
  width: 781px;
  margin: 0 auto;
  background: #ffffff;
  padding: 20px;
  border: 1px solid #ccc;

  .logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    text-align: center;
  }

  .logo img.brasao {
    width: 100px;
    margin-bottom: 10px;
  }

  .logo h3 {
    margin: 2px 0;
    font-size: 16px;
    font-weight: bold;
  }

  .logo h4 {
    margin: 8px 0 4px;
    font-size: 15px;
    font-weight: bold;
    text-transform: uppercase;
  }

  .logo p {
    margin: 2px 0;
    font-size: 13px;
  }

  .logo p.sub {
    font-size: 12px;
    font-style: italic;
    color: #333;
    margin-top: 6px;
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
`;
