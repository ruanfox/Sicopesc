import React, { useCallback, useEffect, useState } from "react";
import { Container, Item } from "./styles";
import { FaHome, FaChartBar, FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useAppLayout } from "../../../contexts/AppLayoutContext";
import api from "../../../services/api";
import useTheme from "../../../hooks/useTheme";

export default function Sidebar() {
  const appContext = useAppLayout();
  const location = useLocation();
  const [hideAnimation, setHideAnimation] = useState(false);
  const [userRole, setUserRole] = useState(localStorage.getItem("USER_ROLE"));

  function hideSidebar() {
    setHideAnimation(true);
    //appContext.toggleShowSidebar();
  }

  const registerAnimationEndEvent = useCallback(() => {
    let sidebar = document.querySelector(".sidebar");
    sidebar.addEventListener("animationend", (event) => {
      setHideAnimation(false);
      if (event.animationName === "kSYWhj") {
        appContext.toggleShowSidebar();
      }
    });
  }, [appContext]);

  useEffect(registerAnimationEndEvent, []);

  useEffect(() => {
    if (!userRole) {
      api.get("/user-logged").then((response) => {
        localStorage.setItem("USER_ROLE", response.data.role);
        setUserRole(response.data.role);
      });
    }
  }, [userRole]);

  const { isDarkMode } = useTheme();

  return (
    <Container
      hideAnimation={hideAnimation}
      show={appContext.showSidebar}
      onClick={hideSidebar}
    >
      <div className="sidebar">
        <div className="brand primary">
          <span className="title white-text">
            <img
              src={isDarkMode ?  require("../../../assets/logo-branca.png") : require("../../../assets/logo-dark.png")}
              alt="logo siscol"
              style={{ maxWidth: 150, maxHeight: 100 }}
            />
          </span>
        </div>

        <ul>
          <li>
            <Item active={location.pathname === "/"}>
              <Link to="/inicio">
                <FaHome size={14} style={{ marginRight: 8 }} />
                <span> Início</span>
              </Link>
            </Item>
          </li>

          {userRole === "ADMIN" && (
            <li>
              <Item>
                <a href="/usuarios">
                  <FaUser size={14} style={{ marginRight: 8 }} />
                  <span>Gerenciar usuários</span>
                </a>
              </Item>
            </li>
          )}

          <li>
            <Item>
              <a href="/relatorios">
                <FaChartBar size={14} style={{ marginRight: 8 }} />
                <span>Relatórios</span>
              </a>
            </Item>
          </li>
        </ul>
      </div>
    </Container>
  );
}
