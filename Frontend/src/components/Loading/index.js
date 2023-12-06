import React from "react";

import { Container } from "./styles";
import { HashLoader } from "react-spinners";

export default function Login() {
  return (
    <Container>
      <HashLoader size={50} color={"#fff"} />
    </Container>
  );
}
