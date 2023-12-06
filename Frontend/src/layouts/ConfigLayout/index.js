import React from "react";
import AppLayoutProvider from "../../contexts/AppLayoutContext";
import useTheme from "../../hooks/useTheme";
import { Container } from "../AppLayout/styles";
import Topbar from "../AppLayout/topbar";
import SideBar from "./SideBar";
import { Wrapper } from "./styles";

// import { Container } from './styles';

function ConfigLayout({ children, title, history }) {
  const { isDarkMode } = useTheme();

  return (
    <AppLayoutProvider>
      <Wrapper>
        <SideBar history={history} />
        <Container>
          <Topbar title={title} history={history} back={false} />
          {children}
          <img
            id="logo-login"
            className="logo-bottom"
            src={
              isDarkMode
                ? require("../../assets/logo-branca.png")
                : require("../../assets/logo-dark.png")
            }
            alt="logo siscol"
          />
        </Container>
      </Wrapper>
    </AppLayoutProvider>
  );
}

export default ConfigLayout;
