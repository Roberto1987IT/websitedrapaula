import React from "react";
import { Link } from "react-router-dom";
import "../styles/Banner.css";
import { useTranslation } from "react-i18next";

const Banner: React.FC = () => {
    const { t } = useTranslation();
    return (
    <section className="banner">
      <div className="banner-content">
        <h1>{t("banner_title_h1")}</h1>
        <p>{t("banner_title_p")}</p>

     
      
<Link 
  to={{ pathname: "/", hash: "#cursos" }} 
  className="cta-button"
>
  {t("more_info")}
</Link>

      </div>


    </section>
  );
};

export default Banner;