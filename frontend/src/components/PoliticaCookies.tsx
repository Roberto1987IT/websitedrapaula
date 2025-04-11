import React from "react";
import "../styles/PoliticaCookies.css";
import {useTranslation} from "react-i18next";

const PoliticaCookies = () => {
  const {t} = useTranslation();
  return (
    <div className="politica-cookies-wrapper">
      <div className="politica-cookies-container">
        <header className="politica-cookies-header">
          <h1>{t("ckookes.title")}</h1>
          <p className="company-name"><strong>{t("ckookes.company_name")}</strong></p>
          <p className="update-date"><em>{t("ckookes.updated")}: 02/04/2025</em></p>
        </header>

        <section className="politica-cookies-section">
          <h2>1. {t("ckookes.pointes.1.title")}</h2>
          <p>
           {t("ckookes.pointes.1.p")}
          </p>
        </section>

        <section className="politica-cookies-section">
          <h2>2. {t("ckookes.pointes.2.title")}</h2>
          <p>{t("ckookes.pointes.2.p")}</p>
          <ul>
            <li>{t("ckookes.pointes.2.li.1")}</li>
            <li>{t("ckookes.pointes.2.li.2")}</li>
            <li>{t("ckookes.pointes.2.li.3")}</li>
            <li>{t("ckookes.pointes.2.li.4")}</li>
          </ul>
        </section>

        <section className="politica-cookies-section">
          <h2>3. {t("ckookes.pointes.3.title")}</h2>
          <p>{t("ckookes.pointes.3.p")}</p>
          <ul>
            <li>
              <strong>{t("ckookes.pointes.3.li_strong.1")}:</strong> {t("ckookes.pointes.3.li.1")}
            </li>
            <li>
              <strong>{t("ckookes.pointes.3.li_strong.2")}:</strong> {t("ckookes.pointes.3.li.2")}
            </li>
            <li>
              <strong>{t("ckookes.pointes.3.li_strong.3")}</strong> {t("ckookes.pointes.3.li.3")}
            </li>
            <li>
              <strong>{t("ckookes.pointes.3.li_strong.4")}:</strong> {t("ckookes.pointes.3.li.4")}
            </li>
          </ul>
        </section>

        <section className="politica-cookies-section">
          <h2>4. {t("ckookes.pointes.4.title")}</h2>
          <p>
            {t("ckookes.pointes.4.p")}
          </p>
        </section>

        <section className="politica-cookies-section">
          <h2>5. {t("ckookes.pointes.5.title")}</h2>
          <p>
            {t("ckookes.pointes.5.p")}
          </p>
        </section>

        <section className="politica-cookies-section">
          <h2>6. {t("ckookes.pointes.6.title")}</h2>
          <p>
            {t("ckookes.pointes.6.p")}
          </p>
        </section>

        <footer className="politica-cookies-footer">
          <p>© {t("footer_bottom")}</p>
        </footer>
      </div>
    </div>
  );
};

export default PoliticaCookies;
