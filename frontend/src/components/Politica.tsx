import React from "react";
import "../styles/Politica.css";
import {useTranslation} from "react-i18next";

const Politica = () => {
    const {t} = useTranslation();
    return (
        <div className="politica-wrapper">
            <div className="politica-container">
                <header className="politica-header">
                    <h1>{t("privacity.title")}</h1>
                    <p className="company-name"><strong>{t("privacity.company_name")}</strong></p>
                    <p className="update-date"><em>{t("updated")}: 02/04/2025</em></p>
                </header>

                <section className="politica-section">
                    <h2>1. {t("privacity.pointes.1.title")}</h2>
                    <p>
                        {t("privacity.pointes.1.p")}
                    </p>
                </section>

                <section className="politica-section">
                    <h2>2. {t("privacity.pointes.2.title")}</h2>
                    <p>{t("privacity.pointes.2.p")}:</p>
                    <ul>
                        <li>{t("privacity.pointes.2.li.1")}</li>
                        <li>{t("privacity.pointes.2.li.2")}</li>
                        <li>
                            {t("privacity.pointes.2.li.3")}
                        </li>
                    </ul>
                </section>

                <section className="politica-section">
                    <h2>3. {t("privacity.pointes.3.title")}</h2>
                    <p>{t("privacity.pointes.3.p")}</p>
                    <ul>
                        <li>{t("privacity.pointes.3.li.1")}</li>
                        <li>{t("privacity.pointes.3.li.2")}</li>
                        <li>{t("privacity.pointes.3.li.3")}</li>
                        <li>{t("privacity.pointes.3.li.4")}</li>
                    </ul>
                </section>

                <section className="politica-section">
                    <h2>4. {t("privacity.pointes.4.title")}</h2>
                    <p>
                        {t("privacity.pointes.4.p")}
                    </p>
                    <p className="email-contact"><a
                        href="paulaserranoeducacao@gmail.com">paulaserranoeducacao@gmail.com</a></p>
                </section>

                <section className="politica-section">
                    <h2>5. {t("privacity.pointes.5.title")}</h2>
                    <p>
                        {t("privacity.pointes.5.p")}
                    </p>
                </section>

                <section className="politica-section">
                    <h2>6. {t("privacity.pointes.6.title")}</h2>
                    <p>{t("privacity.pointes.6.p")}</p>
                    <ul>
                        <li>{t("privacity.pointes.6.li.1")}</li>
                        <li>{t("privacity.pointes.6.li.2")}</li>
                        <li>{t("privacity.pointes.6.li.3")}</li>
                        <li>{t("privacity.pointes.6.li.4")}</li>
                    </ul>
                </section>

                <section className="politica-section">
                    <h2>7. {t("privacity.pointes.7.title")}</h2>
                    <p>
                        {t("privacity.pointes.7.p")}
                    </p>
                </section>

                <section className="politica-section">
                    <h2>8. {t("privacity.pointes.8.title")}</h2>
                    <p>
                        {t("privacity.pointes.8.p")}
                    </p>
                </section>

                <section className="politica-section">
                    <h2>9. {t("privacity.pointes.9.title")}</h2>
                    <p>
                        {t("privacity.pointes.9.p")}
                    </p>
                </section>

                <footer className="politica-footer">
                    <p>© {t("footer_bottom")}</p>
                </footer>
            </div>
        </div>
    );
};

export default Politica;