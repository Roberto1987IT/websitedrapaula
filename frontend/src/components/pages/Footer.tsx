import React from "react";
import "../../styles/pages/footer.css"; // Adjust the path based on your project structure
import logo from "../../assets/logo.svg"; // Ensure this path matches your logo file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left - Logo & Social Icons */}
        <div className="footer-logo-section">
          <img src={logo} alt="Logo Paula Serrano" className="footer-logo" />
        </div>

        <div className="footer-columns-container">
          {/* Middle - Contact Information */}
          <div className="footer-column">
            <h3 className="footer-heading">CONTACTO</h3>
            <div className="footer-content">
              <p className="footer-text">
                <span className="footer-label">Horário:</span> Segunda - Sexta<br />9:00 - 18:00
              </p>
              <p className="footer-text">
                <span className="footer-label">Telefone:</span> (+351) 964309035<br />
                <span className="small-text">(Chamada para rede móvel nacional)</span>
              </p>
              <p className="footer-text">
                <span className="footer-label">Morada:</span> Praceta Agostinho Ferreira Chaves, n: 5, quinto esquerdo<br /> - 8005-328, Faro
              </p>
            </div>
          </div>

          {/* Right - Client Area */}
          <div className="footer-column">
            <h3 className="footer-heading">ÁREA DO CLIENTE</h3>
            <ul className="footer-list">
              <li className="footer-list-item"><a href="#" className="footer-link">A minha conta</a></li>
              <li className="footer-list-item"><a href="#" className="footer-link">Encomendas</a></li>
              <li className="footer-list-item"><a href="#" className="footer-link">Entregas</a></li>
              <li className="footer-list-item"><a href="#" className="footer-link">Perguntas Frequentes</a></li>
            </ul>
          </div>

          {/* Right - Informations */}
          <div className="footer-column">
            <h3 className="footer-heading">INFORMAÇÕES</h3>
            <ul className="footer-list">
              <li className="footer-list-item"><a href="#" className="footer-link">Política de Privacidade</a></li>
              <li className="footer-list-item"><a href="#" className="footer-link">Política de Cookies</a></li>
              <li className="footer-list-item"><a href="#" className="footer-link">Termos e condições</a></li>
              <li className="footer-list-item"><a href="#" className="footer-link">Livro de Reclamações</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p className="footer-copyright">© {new Date().getFullYear()} Paula Serrano. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
