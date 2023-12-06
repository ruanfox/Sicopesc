import React, { useEffect } from "react";

// import { Container } from './styles';
import M from "materialize-css";

function Excluir({ message, deleteFunction }) {
  useEffect(() => {
    var elems = document.querySelectorAll(".modal");
    M.Modal.init(elems, { opacity: 0.5 });
  }, []);
  return (
    <div id="modalExcluir" className="modal bottom-sheet">
      <div className="modal-content">
        <h4>Tem certeza que deseja excluir?</h4>
        <p>{message}</p>
        <p>Esta ação não pode ser desfeita.</p>
      </div>
      <div className="modal-footer">
        <a
          href="closemodal"
          onClick={(e) => e.preventDefault()}
          className="modal-close btn-flat"
        >
          Cancelar
        </a>
        <a
          href="#!"
          className="modal-close waves-effect waves-red btn red"
          onClick={deleteFunction}
        >
          Excluir
        </a>
      </div>
    </div>
  );
}

export default Excluir;
