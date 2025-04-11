import React from "react";
import "../styles/TermosCondicoes.css";
import {useTranslation} from "react-i18next";

const TermosCondicoes = () => {
  const {t} = useTranslation();
  return (
    <div className="termos-wrapper">
      <div className="termos-condicoes-container">
        <header className="termos-header">
          <h1>{t("terms.title")}</h1>
          <p className="company-name"><strong>{t("terms.company_name")}</strong></p>
          <p className="update-date"><em>{t("terms.updated")}: 02/04/2025</em></p>
        </header>

        <section className="termos-section">
          <h2>1. {t("terms.pointes.1.title")}</h2>
          <p>
            {t("terms.pointes.1.p")}
          </p>
        </section>

        <section className="termos-section">
          <h2>2. {t("terms.pointes.2.title")}</h2>
          <p>
            {t("terms.pointes.2.p")}
          </p>
        </section>

        <section className="termos-section">
          <h2>3. {t("terms.pointes.3.title")}</h2>
          <p>
            {t("terms.pointes.3.p")}
          </p>
        </section>

        <section className="termos-section">
          <h2>4. {t("terms.pointes.4.title")}</h2>
          <p>
            {t("terms.pointes.4.p")}
          </p>
        </section>

        <section className="termos-section">
          <h2>5. {t("terms.pointes.5.title")}</h2>
          <p>
            {t("terms.pointes.5.p")}
          </p>
        </section>

        <section className="termos-section">
          <h2>6. {t("terms.pointes.6.title")}</h2>
          <p>
            {t("terms.pointes.6.p")}
          </p>
        </section>

        <section className="termos-section">
          <h2>7. {t("terms.pointes.7.title")}</h2>
          <p>
            {t("terms.pointes.7.p")}
          </p>
        </section>

        <section className="termos-section">
          <h2>8. {t("terms.pointes.8.title")}</h2>
          <p>
            {t("terms.pointes.8.p")}
          </p>
        </section>

        <footer className="termos-footer">
          <p>© {t("footer_bottom")}</p>
        </footer>
      </div>
    </div>
  );
};

export default TermosCondicoes;