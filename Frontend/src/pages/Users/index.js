import React, { useEffect, useState } from "react";

import { Container } from "./styles";

import { Modal } from "react-bootstrap";
import { HashLoader, PulseLoader } from "react-spinners";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";

function Users() {
  const [users, setUsers] = useState([]);
  const [showModalExcluir, setShowModalExcluir] = useState(false);
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function deletePescador(e) {
    e.preventDefault();
    setDeleting(true);
    try {
      await api.delete(`/user/${userId}`);
      //props.history.push(`/pescador`);
      window.location.reload();
    } catch (e) {
      //setToLogin(true);
    }
    setDeleting(false);
  }

  useEffect(() => {
    function getUsers() {
      setLoading(true);
      api
        .get("/users")
        .then((response) => {
          const users = response.data;
          setUsers(users);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    getUsers();
  }, []);

  return (
    <Container className="container">
      <Link
        className="btn btn-primary mb-2"
        style={{ width: 176 }}
        to="/novo-usuario"
      >
        <FaUserPlus style={{ marginRight: 5 }} /> Novo usuário
      </Link>
      <table className="table table-responsive">
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td style={{ display: "flex" }}>
                <Link
                  className="btn btn-warning"
                  to={`/editar-usuario/${user.id}`}
                  style={{ width: 60, height: 50, marginLeft: 10 }}
                >
                  <FaEdit />
                </Link>
                {user.role !== "ADMIN" && (
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      setUserId(user.id);
                      setShowModalExcluir(true);
                    }}
                    style={{ width: 60, height: 50, marginLeft: 10 }}
                  >
                    <FaTrash />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        {loading ? <HashLoader size={30} /> : ""}
      </table>

      <Modal show={showModalExcluir} size="lg" centered>
        <Modal.Header>
          <Modal.Title>Tem certeza que deseja excluir?</Modal.Title>
          <button
            type="button"
            class="btn-close"
            onClick={() => setShowModalExcluir(false)}
          ></button>
        </Modal.Header>
        <Modal.Body>Esta ação não pode ser desfeita.</Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowModalExcluir(false)}
          >
            Fechar
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={deletePescador}
          >
            {deleting ? (
              <PulseLoader color={"#fff"} />
            ) : (
              <>
                <FaTrash style={{ marginRight: 5 }} /> Excluir
              </>
            )}
          </button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Users;
