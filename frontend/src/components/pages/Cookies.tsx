import React from "react";
import "../../styles/pages/privacyPolicy.css";
import {useTranslation} from "react-i18next";

const Cookies = () => {
    const {t} = useTranslation();
    return (
    <div className="privacy-policy" style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>{t("")}</h1>
      <p>
        {t("")}
      </p>

      <h2>{t("")}</h2>
      <p>
        {t("")}
      </p>

      <h2>{t("")}</h2>
      <p>
          {t("")}
      </p>

      <h2>{t("")}</h2>
      <ul>
        <li>
          <strong>{t("")}</strong>: {t("")}
        </li>
        <li>
          <strong>{t("")}</strong>: {t("")}
        </li>
        <li>
          <strong>{t("")}</strong>: {t("")}
        </li>
        <li>
          <strong>{t("")}</strong>: {t("")}
        </li>
      </ul>

      <h2>{t("")}</h2>
      <p>
        {t("")}
      </p>
      <p>
         {t("")}
          {" "}<a href="http://www.aboutcookies.org" target="_blank" rel="noopener noreferrer">
          www.aboutcookies.org
        </a>{" "}
        ou{" "}
        <a href="http://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">
          www.allaboutcookies.org
        </a>.
      </p>

      <h2>{t("")}</h2>
      <p>
        {t("")}{" "}
        <a href="mailto:seu-email@example.com">paulaserranoeducacao@gmail.com</a>.
      </p>
    </div>
  );
};

export default Cookies;