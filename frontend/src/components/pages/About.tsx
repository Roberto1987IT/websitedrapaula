import { useState } from "react";
import "../../styles/pages/about.css";
import aboutImage from "../../assets/about/Design sem nome 1.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";


// Add interface for props
interface AboutProps {
  id?: string;
}

const About: React.FC<AboutProps> = ({ id }) => {
  const [showFullText, setShowFullText] = useState(false);
  const { t, i18n } = useTranslation();
  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  return (
    // Add id to section element
    <section id={id} className="about">
      <div className="about-container">
        {/* Header Section: Tag and Heading */}
        <div className="about-header">
          <span className="about-tag">{t("come_meeting")}</span>
          <h2>Paula Serrano</h2>
        </div>

        {/* Right Side: Image */}
        <div className="about-image">
          <img src={aboutImage} alt="Dra. Paula Serrano" />
        </div>

        {/* Left Side: Remaining Text Content */}
        <div className="about-content">
          <div className={`about-text ${showFullText ? "expanded" : "collapsed"}`}>
            <p>
              {t("about_p1")}
            </p>
            <p className="additional-text">
              {t("about_p2")}
            </p>
          </div>

          <button 
            className="read-more-button" 
            onClick={toggleText}
            aria-expanded={showFullText}
          >
            {showFullText ? t("read_less") : t("read_more")}
          </button>

          <Link to="/about-detail">
            <button className="about-button" aria-label="Saiba mais sobre Dra. Paula Serrano">
              {t("come_meeting")}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;