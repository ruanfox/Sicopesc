import React, { useEffect, useState } from "react";
import api from "../../services/api";
import ReciboComponent from "./ReciboComponent";

import { Container } from "./styles";

function Recibo(props) {
  const [recibo, setRecibo] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    function getRecibo(id) {
      api
        .get(`/recibo/${id}`)
        .then((response) => {
          setRecibo(response.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    const reciboId = props.match.params.id;
    if (reciboId) getRecibo(reciboId);
  }, [props]);
  return (
    <Container className="container">
      {!loading ? (
        <>
          <ReciboComponent recibo={recibo} />
          <ReciboComponent recibo={recibo} style={{ marginTop: 20 }} />
          <button className="btn btn-primary mt-2" onClick={window.print}>
            Imprimir
          </button>
        </>
      ) : (
        "Carregando..."
      )}
    </Container>
  );
}

export default Recibo;
