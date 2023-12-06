import React, { useEffect, useState } from "react";

import api from "../../../services/api";

import { FaLock, FaUser } from "react-icons/fa";
import { Form } from "./styles";
import { PulseLoader } from "react-spinners";

export default function NewUser(props) {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messageUser, setMessageUser] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = props.match.params.id;

    function getUser() {
      api
        .get(`/user/${userId}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((err) => {
          props.history.push("/usuarios");
        });
    }

    if (userId) {
      setUserId(userId);
      getUser();
    }
  }, [props.match.params.id, props]);

  function handleSubmitForm(e) {
    e.preventDefault();
    if (!userId) addUser(e);
    else updateUser(e);
  }

  async function updateUser(e) {
    if (e.target.password.value !== e.target.password_confirm.value)
      return setMessageUser("A senhas não coincidem.");

    const data = {
      id: userId,
      nome: e.target.nome.value,
      email: e.target.email_name.value,
      password: e.target.password.value.toUpperCase(),
    };
    const jsonData = JSON.stringify(data);

    setLoading(true);

    api
      .put("/user", jsonData)
      .then(() => {
        alert("Usuário atualizado no sistema!");
        props.history.push("/usuarios");
      })
      .catch((err) => {
        alert(err.response.data.error);
      })
      .finally(() => setLoading(false));
  }

  async function addUser(e) {
    if (e.target.password.value !== e.target.password_confirm.value)
      return setMessageUser("A senhas não coincidem.");

    const data = {
      nome: e.target.nome.value,
      email: e.target.email_name.value,
      password: e.target.password.value.toUpperCase(),
    };
    const jsonData = JSON.stringify(data);

    setLoading(true);

    api
      .post("/new-user", jsonData)
      .then((response) => {
        if (response.data.erro) {
          alert("erro " + response.data.erro);
        } else if (response.status === 200) {
          alert("Usuário cadastrado no sistema!");
        }
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
        props.history.push("/usuarios");
      });
  }

  return (
    <div
      className="container"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div
        className="card"
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: 384,
        }}
      >
        {messageUser && messageUser !== "" && (
          <div
            className="alert alert-danger"
            style={{ width: "100%" }}
            role="alert"
          >
            {messageUser}
          </div>
        )}
        <Form onSubmit={handleSubmitForm} style={{ padding: 20 }}>
          <div className="mb-4 input-group">
            <span className="input-group-text" id="basic-addon1">
              <FaUser />
            </span>
            <input
              id="nome_usuario"
              className="form-control"
              name="nome"
              type="text"
              defaultValue={user?.nome}
              autoComplete="off"
              placeholder="Nome"
              required
            />
          </div>
          <div className="mb-4 input-group">
            <span className="input-group-text" id="basic-addon1">
              @
            </span>
            <input
              id="email_usuario"
              className="form-control"
              name="email_name"
              type="text"
              defaultValue={user?.email}
              autoComplete="off"
              placeholder="E-mail"
              required
            />
          </div>
          <div className="input-group mb-4">
            <span className="input-group-text">
              <FaLock />
            </span>
            <input
              name="password"
              className="form-control"
              type="password"
              placeholder="Senha"
              required
            />
          </div>

          <div className="input-group mb-4">
            <span className="input-group-text">
              <FaLock />
            </span>
            <input
              name="password_confirm"
              className="form-control"
              type="password"
              placeholder="Confimar senha"
              required
            />
          </div>

          <button
            style={{ width: "100%", fontSize: 18 }}
            type="submit"
            className="btn btn-primary"
            title="Fazer login"
            disabled={loading}
          >
            {!loading ? (
              userId ? (
                "Editar usuário"
              ) : (
                "Criar usuário"
              )
            ) : (
              <PulseLoader color={"#fff"} />
            )}
          </button>
        </Form>
      </div>
    </div>
  );
}
