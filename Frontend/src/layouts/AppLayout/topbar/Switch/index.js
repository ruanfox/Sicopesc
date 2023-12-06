import React from "react";
import { Container } from "./styles";

export default function Switch({style = {}, onChange= () => {}, checked=false}) {
  return (
    <Container style={style}>
      <input type="checkbox" onChange={onChange} checked={checked} />
      <span className="slider round"></span>
    </Container>
  );
}
