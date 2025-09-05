import React from "react";

// import { Container } from './styles';

export default function Footer() {
  return (
    <footer className="page-footer z-depth-2" style={{ background: "var(--primary)", color: "white" }}>
      <div className="container-fluid text-color" style={{ textAlign: 'center', padding: '12px 0', color: 'white' }}>
        © SICOPESC. Todos os direitos reservados<br/>
        Desenvolvido por <strong style={{ color: 'white' }}>DISPLAY LAB</strong>.
      </div>
    </footer>
  );
}
