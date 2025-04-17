import React, {useState, useEffect} from "react";
import {useNavigate, useLocation} from 'react-router-dom';
import {ChevronDown, ChevronUp, Mail} from "lucide-react";
import "../../styles/pages/mentorshipDetail.css";
import mentorshipImage from "../../assets/courses/PaulaSerrano-102 1.png";
import {useTranslation} from "react-i18next";

const MentorshipDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
    const {t} = useTranslation();
    // Scroll to top on component mount or scroll to specific section if hash is present
    useEffect(() => {
        if (location.hash) {
            const sectionId = location.hash.substring(1); // Remove the "#" from the hash
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({behavior: "smooth"});
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [location]);

    const toggleFaq = (index: number) => {
        setActiveFaqIndex(activeFaqIndex === index ? null : index);
    };

    const handleContactClick = () => {
        navigate('/contact');
        // Scroll to top after navigation
        window.scrollTo(0, 0);
    };

    const faqs = [
        {
            question: t("FAQ.1.question"),
            answer: t("FAQ.1.answer"),
        },
        {
            question: t("FAQ.2.question"),
            answer: t("FAQ.2.answer"),
        },
        {
            question: t("FAQ.3.question"),
            answer: t("FAQ.3.answer"),
        },
        {
            question: t("FAQ.4.question"),
            answer: t("FAQ.4.answer"),
        }
    ];


    return (
        <div className="mentorship-details">
            <div className="mentorship-details-header">
                <span className="mentorship-details-tag">{t("mentorship_program")}</span>
                <h1 className="mentorship-details-title">{t("mentorship_program_h1")}</h1>
                <p className="mentorship-details-subtitle">
                    {t("mentorship_program_h1_p")}
                </p>
            </div>

            <div className="mentorship-details-content">
                <div className="mentorship-details-image">
                    <img
                        src={mentorshipImage}
                        alt="Mentoria Profissional"
                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                            e.currentTarget.src = "/default-image.png";
                        }}
                    />
                </div>

                <div className="mentorship-details-info">
                    <div className="mentorship-details-section">
                        <h3>{t("mentorship_h3_1")}</h3>
                        <p>
                            {t("mentorship_h3_1_p")}
                        </p>
                    </div>

                    <div className="mentorship-details-section">
                        <h3>{t("mentorship_h3_2")}</h3>
                        <ul>
                            <li>{t("mentorship_h3_2_p.1.text")}</li>
                            <li>{t("mentorship_h3_2_p.2.text")}</li>
                            <li>{t("mentorship_h3_2_p.3.text")}</li>
                            <li>{t("mentorship_h3_2_p.4.text")}</li>
                        </ul>
                    </div>

                    <div className="mentorship-details-section">
                        <h3>{t("mentorship_h3_3")}</h3>
                        <p>
                            {t("mentorship_h3_3_p")}
                        </p>
                        <ul>
                            <li>{t("mentorship_h3_3_p_fases.1.text")}</li>
                            <li>{t("mentorship_h3_3_p_fases.2.text")}</li>
                            <li>{t("mentorship_h3_3_p_fases.3.text")}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mentorship-purchase">
                <p className="mentorship-price-info">{t("meet_mentorship_programm")}</p>

                <div className="mentorship-purchase-buttons">
                    <button
                        className="mentorship-contact-button"
                        onClick={handleContactClick}
                    >
                        <Mail size={20}/>
                        {t("more_info")}
                    </button>
                </div>
            </div>

            <div className="mentorship-types">
                <h2 className="mentorship-types-title">{t("ind_and_group_mentorchip")}</h2>

                <div className="mentorship-types-cards">
                    <div className="mentorship-type-card">
                        <h3>{t("mentor_info_list.indiv.h")}</h3>
                        <p>
                            {t("mentor_info_list.indiv.text")}
                        </p>
                        <ul>
                            <li>{t("mentor_info_list.indiv.li1")}</li>
                            <li>{t("mentor_info_list.indiv.li2")}</li>
                            <li>{t("mentor_info_list.indiv.li3")}</li>
                            <li>{t("mentor_info_list.indiv.li4")}</li>
                        </ul>
                    </div>

                    <div className="mentorship-type-card">
                        <h3>{t("mentor_info_list.group.h")}</h3>
                        <p>
                            {t("mentor_info_list.group.text")}
                        </p>
                        <ul>
                            <li>{t("mentor_info_list.group.li1")}</li>
                            <li>{t("mentor_info_list.group.li2")}</li>
                            <li>{t("mentor_info_list.group.li3")}</li>
                            <li>{t("mentor_info_list.group.li4")}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <section id="faq">
                <h2>{t("FAQ_title")}</h2>
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className={`faq-item ${activeFaqIndex === index ? 'active' : ''}`}
                        onClick={() => toggleFaq(index)}
                    >
                        <div className="faq-question">
                            {faq.question}
                            {activeFaqIndex === index ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
                        </div>
                        <div className="faq-answer">
                            {faq.answer}
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default MentorshipDetails;