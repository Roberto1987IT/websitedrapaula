import React from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useTranslation } from "react-i18next";
import "../../styles/pages/mentorship.css";
import mentorshipImage from "../../assets/courses/PaulaSerrano-102 1.png";

const Mentorship = ({ id }: { id: string }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const { t } = useTranslation();

  const handleSaibaMaisClick = () => {
    navigate('/mentorship-details'); // Navigate to the MentorshipDetails page
  };

  return (
    <section id={id} className="mentorship">
      <div className="mentorship-container">
        <div className="mentorship-intro-tag">
          <span className="mentorship-tag">{t("tranings_mentorships")}</span>
          <p className="mentorship-intro">
            {t("tranings_mentorships_description_p")}
          </p>
        </div>

        <div className="mentorship-image">
          <img
            src={mentorshipImage}
            alt="Mentorship Session"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.src = "/default-image.png";
            }}
          />
        </div>

        <div className="mentorship-main-content">
          <h2>{
            t("tranings_mentorships_description_h2")
          }</h2>
          <p>
            {
              t("tranings_mentorships_description_h2_p")
            }
          </p>
          <h3>{t("tranings_mentorships_description_h3")}</h3>
          <ul>
            <li>{t("mentorships_ul_lu1")}</li>
            <li>{t("mentorships_ul_lu2")}</li>
            <li>{t("mentorships_ul_lu3")}</li>
          </ul>
          <button
            className="mentorship-button"
            aria-label="Saiba mais sobre mentoria"
            onClick={handleSaibaMaisClick} // Use the new function
          >
            {t("more_info")}
          </button>
          <p className="mentorship-testimonial">
            
          </p>
        </div>
      </div>
    </section>
  );
};

export default Mentorship;