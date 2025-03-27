import React, { useState } from "react";
import "../../styles/pages/contactform.css";


const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Live validation
    if (name === "email" && value && !/\S+@\S+\.\S+/.test(value)) {
      setErrors({ ...errors, email: "Email inválido" });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {
      name: formData.name ? "" : "Nome é obrigatório",
      email: formData.email 
        ? !/\S+@\S+\.\S+/.test(formData.email) 
          ? "Email inválido" 
          : "" 
        : "Email é obrigatório",
      subject: formData.subject ? "" : "Assunto é obrigatório",
      message: formData.message ? "" : "Mensagem é obrigatória",
    };
    
    setErrors(newErrors);

    // If no errors, submit the form
    if (!Object.values(newErrors).some((error) => error)) {
      setIsSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        
        // Reset submitted state after 5 seconds
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      }, 1500);
    }
  };

  return (
    <section className="cf-contact-section">
      <div className="cf-contact-container">
        {/* Left Side - Text */}
        <div className="cf-contact-text">
          <h2>Entre em Contato</h2>
          <p>
            Na Paula Serrano, valorizamos cada ligação com os nossos clientes. Seja para esclarecer dúvidas, receber feedback valioso ou simplesmente trocar uma ideia, a nossa equipa está sempre pronta para ouvir e ajudar.
          </p>
          
          <p>
            Utilize nosso formulário de contato para:
          </p>

          <ul className="cf-contact-benefits">
            <li>Solicitar orçamentos personalizados</li>
            <li>Obter informações técnicas sobre os nossos produtos</li>
            <li>Dar sugestões para melhorarmos os nossos serviços</li>
          </ul>

          <p>
            Para um atendimento imediato durante o horário comercial (Seg-Sex: 9h-18h), também pode contactar-nos diretamente pelo telefone <strong>(+351) 965 430 026</strong>. Garantimos uma resposta por e-mail em até 24 horas úteis para todas as mensagens recebidas.
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="cf-contact-form">
          <h2>Envie-nos uma mensagem</h2>
          <form onSubmit={handleSubmit}>
            <div className="cf-form-group">
              <label htmlFor="name">Nome:</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Digite seu nome completo"
                value={formData.name}
                onChange={handleChange}
                required
                aria-required="true"
                disabled={isSubmitting}
              />
              {errors.name && <span className="cf-error">{errors.name}</span>}
            </div>

            <div className="cf-form-group">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="exemplo@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                aria-required="true"
                disabled={isSubmitting}
              />
              {errors.email && <span className="cf-error">{errors.email}</span>}
            </div>

            <div className="cf-form-group">
              <label htmlFor="subject">Assunto:</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                aria-required="true"
                disabled={isSubmitting}
              >
                <option value="">Selecione um assunto</option>
                <option value="duvida">Dúvida sobre produtos</option>
                <option value="orcamento">Solicitar orçamento</option>
                <option value="feedback">Feedback</option>
                <option value="outro">Outro assunto</option>
              </select>
              {errors.subject && <span className="cf-error">{errors.subject}</span>}
            </div>

            <div className="cf-form-group">
              <label htmlFor="message">Mensagem:</label>
              <textarea
                id="message"
                name="message"
                placeholder="Escreva sua mensagem detalhada aqui..."
                value={formData.message}
                onChange={handleChange}
                required
                aria-required="true"
                disabled={isSubmitting}
              ></textarea>
              {errors.message && <span className="cf-error">{errors.message}</span>}
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting || submitted}
            >
              {isSubmitting ? 'Enviando...' : submitted ? 'Mensagem Enviada!' : 'Enviar mensagem'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
