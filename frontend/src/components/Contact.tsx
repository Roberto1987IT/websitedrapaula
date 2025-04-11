import React, { useState, FormEvent } from "react";
import "../styles/contact.css";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1 className="contact-header">{t("contact")}</h1>
        
        <div className="contact-content">
          {/* Contact Form Section */}
          <div className="contact-form">
            {formSubmitted ? (
              <div className="form-success">
                <p>Obrigado! Entraremos em contato em breve.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2>{t("contact_us_form_h2")}</h2>
                {error && <div className="error-message">{error}</div>}

                <div className="form-group">
                  <label htmlFor="name">{t("name")}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t("contact_us_form_name_placeholder")}
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
                    placeholder="email@exemplo.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">{t("contact_us_form_messag")}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t("contact_us_form_messag_placeholder")}
                    rows={5}
                  />
                </div>

                <button type="submit" className="submit-button">
                  {t("contact_us_form_button")}
                </button>
              </form>
            )}
          </div>

          {/* Contact Information Section */}
          <div className="contact-info">
            <div className="info-section">
              <h2>{t("schedule")}</h2>
              <p>{t("mon-fri")}: 9:00 - 18:00</p>
            </div>

            <div className="info-section">
              <h2>{t("phone")}</h2>
              <p className="phone-number">(+351) 964 309 035</p>
              <p className="phone-note">{t("phone_info")}</p>
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
            <h3>{t("cust_area")}</h3>
            <ul>
              <li><a href="/account">{t("ac_o1")}</a></li>
              <li><a href="/orders">{t("ac_o2")}</a></li>
              <li><a href="/deliveries">{t("ac_o3")}</a></li>
              <li><a href="/faq">{t("ac_o4")}</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>{t("info")}</h3>
            <ul>
              <li><a href="/privacy">{t("info_o1")}</a></li>
              <li><a href="/cookies">{t("info_o2")}</a></li>
              <li><a href="/terms">{t("info_o3")}</a></li>
              <li><a href="/complaints">{t("info_o4")}</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="contact-copyright">
          <p>© {new Date().getFullYear()} {t("footer_bottom")}</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
