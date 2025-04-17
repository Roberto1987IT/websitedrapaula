import React, { useState } from "react";
import "../../styles/pages/contactform.css";
import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation();

  return (
    <section className="cf-contact-section">
      <div className="cf-contact-container">
        {/* Left Side - Text */}
        <div className="cf-contact-text">
          <h2>{t("contact_form_h2")}</h2>
          <p>
            {t("contact_our_valor1")}
          </p>
          
          <p>
            {t("contact_our_valor2")}
          </p>

          <ul className="cf-contact-benefits">
            <li>{t("contact_our_benefits1")}</li>
            <li>{t("contact_our_benefits2")}</li>
            <li>{t("contact_our_benefits3")}</li>
          </ul>

          <p>
           {t("contact_contact_imediatly")}
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="cf-contact-form">
          <h2>{t("contact_us_form_h2")}</h2>
          <form onSubmit={handleSubmit}>
            <div className="cf-form-group">
              <label htmlFor="name">{t("contact_us_form_name")}:</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder={t("contact_us_form_name_placeholder")}
                value={formData.name}
                onChange={handleChange}
                required
                aria-required="true"
                disabled={isSubmitting}
              />
              {errors.name && <span className="cf-error">{errors.name}</span>}
            </div>

            <div className="cf-form-group">
              <label htmlFor="email">{t("contact_us_form_email")}:</label>
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
              <label htmlFor="subject">{t("contact_us_form_subject")}:</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                aria-required="true"
                disabled={isSubmitting}
              >
                <option value="">{t("contact_us_form_subject_1")}</option>
                <option value="duvida">{t("contact_us_form_subject_2")}</option>
                <option value="orcamento">{t("contact_us_form_subject_3")}</option>
                <option value="feedback">{t("contact_us_form_subject_4")}</option>
                <option value="outro">{t("contact_us_form_subject_5")}</option>
              </select>
              {errors.subject && <span className="cf-error">{errors.subject}</span>}
            </div>

            <div className="cf-form-group">
              <label htmlFor="message">{t("contact_us_form_messag")}:</label>
              <textarea
                id="message"
                name="message"
                placeholder={t("contact_us_form_messag_placeholder")}
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
              {isSubmitting ? t("sended") : submitted ? 'Mensagem Enviada!' : t("contact_us_form_button")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
