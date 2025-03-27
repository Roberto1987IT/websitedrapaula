import React, { useState, FormEvent } from "react";
import "../styles/contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.message) {
      setError("Por favor, preencha todos os campos.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Insira um email válido.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log("Form submitted:", formData);
    setFormSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1 className="contact-header">Contacto</h1>
        
        <div className="contact-content">
          {/* Contact Form Section */}
          <div className="contact-form">
            {formSubmitted ? (
              <div className="form-success">
                <p>Obrigado! Entraremos em contato em breve.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2>Fale Conosco</h2>
                {error && <div className="error-message">{error}</div>}

                <div className="form-group">
                  <label htmlFor="name">Nome</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu.email@exemplo.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Mensagem</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Escreva sua mensagem aqui..."
                    rows={5}
                  />
                </div>

                <button type="submit" className="submit-button">
                  Enviar
                </button>
              </form>
            )}
          </div>

          {/* Contact Information Section */}
          <div className="contact-info">
            <div className="info-section">
              <h2>Horário</h2>
              <p>Segunda - Sexta: 9:00 - 18:00</p>
            </div>

            <div className="info-section">
              <h2>Telefone</h2>
              <p className="phone-number">(+351) 964 309 035</p>
              <p className="phone-note">Chamada para rede móvel nacional</p>
            </div>

            <div className="info-section">
              <h2>Email</h2>
              <p>paulaserranoeducacao@gmail.com</p>
              
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="contact-footer">
          <div className="footer-section">
            <h3>Área do Cliente</h3>
            <ul>
              <li><a href="/account">A minha conta</a></li>
              <li><a href="/orders">Encomendas</a></li>
              <li><a href="/deliveries">Entregas</a></li>
              <li><a href="/faq">Perguntas Frequentes</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Informações</h3>
            <ul>
              <li><a href="/privacy">Política de Privacidade</a></li>
              <li><a href="/cookies">Política de Cookies</a></li>
              <li><a href="/terms">Termos e Condições</a></li>
              <li><a href="/complaints">Livro de Reclamações</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="contact-copyright">
          <p>© {new Date().getFullYear()} Paula Serrano. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
