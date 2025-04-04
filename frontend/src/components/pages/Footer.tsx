import React from "react";
import { Instagram, Facebook, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import "../../styles/pages/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left - Logo & Social Icons */}
        <div className="footer-logo-section">
          <img src="src/assets/logo.svg" alt="Logo Paula Serrano" className="footer-logo" />
          <div className="social-icons">
            <a 
              href="https://www.instagram.com/paulamserrano/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="https://www.facebook.com/paula.serrano.3576" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a 
              href="mailto:info@paulaserrano.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
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
                <span className="footer-label">Telefone:</span> 
                <a href="tel:+351964309035" className="footer-link">(+351) 964309035</a>
                <br />
                <span className="small-text">(Chamada para rede móvel nacional)</span>
              </p>
              <p className="footer-text">
                <span className="footer-label">Morada:</span> 
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Praceta+Agostinho+Ferreira+Chaves,+n:+5,+quinto+esquerdo+-+8005-328,+Faro" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-link"
                >
                  Praceta Agostinho Ferreira Chaves, n: 5, quinto esquerdo<br /> - 8005-328, Faro
                </a>
              </p>
            </div>
          </div>

          {/* Right - Client Area */}
          <div className="footer-column">
            <h3 className="footer-heading">ÁREA DO CLIENTE</h3>
            <ul className="footer-list">
              <li className="footer-list-item">
                <Link to="/profile" className="footer-link">A minha conta</Link>
              </li>
              <li className="footer-list-item">
                <Link to="/cart" className="footer-link">Encomendas</Link>
              </li>
              <li className="footer-list-item">
                <Link to="/contact" className="footer-link">Entregas</Link>
              </li>
              <li className="footer-list-item">
                <Link to="/mentorship-details#faq" className="footer-link">Perguntas Frequentes</Link>
              </li>
            </ul>
          </div>

          {/* Right - Informations */}
          <div className="footer-column">
            <h3 className="footer-heading">INFORMAÇÕES</h3>
            <ul className="footer-list">
              <li className="footer-list-item">
                <Link to="/politica" className="footer-link">Política de Privacidade</Link>
              </li>
              <li className="footer-list-item">
                <Link to="/politica-cookies" className="footer-link">Política de Cookies</Link>
              </li>
              <li className="footer-list-item">
                <Link to="/termos-condicoes" className="footer-link">Termos e condições</Link>
              </li>
              <li className="footer-list-item">
                <a 
                  href="https://www.livroreclamacoes.pt/Inicio/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-link"
                >
                  Livro de Reclamações
                </a>
              </li>
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