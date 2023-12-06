import React, { useState } from "react";
import { FaUser, FaBars, FaDoorOpen, FaAngleLeft } from "react-icons/fa";
//import { useDispatch } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { Container } from "./styles";
import { useAppLayout } from "../../../contexts/AppLayoutContext";

export default function Topbar({ title = "", history, back = true }) {
  //const dispatch = useDispatch();
  const [toLogin, setToLogin] = useState(false);
  const userName = localStorage.getItem("user_name");
  const layoutContext = useAppLayout();
  const location = useLocation();

  /*function toggleSidebar(e) {
    e.preventDefault();
    dispatch({ type: "TOGGLE_SIDEBAR" });
  }*/

  function signoff() {
    localStorage.removeItem("entidade_id");
    localStorage.removeItem("_token");
    localStorage.removeItem("USER_ROLE");
    setToLogin(true);
  }

  if (toLogin) {
    return <Redirect to="/login" />;
  }

  function onMenuClick(e) {
    e.preventDefault();
    layoutContext.toggleShowSidebar();
  }

  return (
    <Container className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {back ? (
          <span
            className="navbar-brand"
            onClick={
              location.pathname === "/inicio"
                ? onMenuClick
                : () => history.goBack()
            }
          >
            {location.pathname === "/inicio" ? (
              <FaBars />
            ) : (
              <>
                {" "}
                <FaAngleLeft size={30} style={{ marginRight: 5 }} /> Voltar{" "}
              </>
            )}
          </span>
        ) : (
          <span></span>
        )}

        <h1 className="nav-center">{title}</h1>

        <div className="dropdown">
          <div
            className="user dropdown-toggle"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <div className="me-auto"></div>
            <a href="#!">{userName?.split(" ")[0]}</a>
            <FaUser />
          </div>

          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="dropdownMenuButton1"
          >
            <li>
              <button className="dropdown-item" onClick={signoff}>
                <FaDoorOpen style={{ marginRight: 5 }} /> Sair
              </button>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
}
