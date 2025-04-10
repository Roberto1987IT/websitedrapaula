import React, {useEffect, useRef} from "react";
import {Heart, Lightbulb, Book} from "lucide-react";
import {useNavigate} from "react-router-dom";
import "../../styles/pages/nossosValores.css";
import {useTranslation} from 'react-i18next';

const NossosValores = () => {
    const navigate = useNavigate();
    const sectionRefs = {
        main: useRef(null),
        mission: useRef(null),
        values: useRef(null),
        commitment: useRef(null)
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in-view");
                    }
                });
            },
            {threshold: 0.1}
        );

        Object.values(sectionRefs).forEach(
            (ref) => ref.current && observer.observe(ref.current)
        );

        return () => {
            Object.values(sectionRefs).forEach(
                (ref) => ref.current && observer.unobserve(ref.current)
            );
        };
    }, []);

    const handleNavigateToMentorias = () => {
        navigate('/mentorias'); // Corrected to match your route configuration
    };
    const {t} = useTranslation();
    return (
        <div className="nossos-valores-wrapper">
            <div className="nossos-valores-hero">
                <div className="nossos-valores-hero-content">
                    <span className="nossos-valores-tag">{t("home_filosofia")}</span>
                    <h1 className="nossos-valores-heading">{t("home_val")}</h1>
                    <p className="nossos-valores-subtitle">
                        {t("home_val_p")}
                    </p>
                </div>
            </div>

            <div className="nossos-valores-container" ref={sectionRefs.main}>
                <div className="nossos-valores-intro">
                    <p className="nossos-valores-text highlight">
                        <br/> <br/> <br/>
                    </p>
                </div>

                <div className="nossos-valores-card" ref={sectionRefs.mission}>
                    <div className="card-icon">
                        <Heart size={28} strokeWidth={1.5}/>
                    </div>
                    <h2 className="nossos-valores-subheading">{t("mission")}</h2>
                    <p className="nossos-valores-text">
                        {t("mission_p1")}
                    </p>
                    <p className="nossos-valores-text">
                        {t("mission_p2")}
                    </p>
                </div>

                <div className="nossos-valores-card" ref={sectionRefs.values}>
                    <div className="card-icon">
                        <Lightbulb size={28} strokeWidth={1.5}/>
                    </div>
                    <h2 className="nossos-valores-subheading">{t("bases")}</h2>
                    <div className="valores-grid">
                        <div className="valor-item">
                            <h3>{t("basses.1.title")}</h3>
                            <p>{t("basses.1.text")}</p>
                        </div>
                        <div className="valor-item">
                            <h3>{t("basses.2.title")}</h3>
                            <p>{t("basses.2.text")}</p>
                        </div>
                        <div className="valor-item">
                            <h3>{t("basses.3.title")}</h3>
                            <p>{t("basses.3.text")}</p>
                        </div>
                        <div className="valor-item">
                            <h3>{t("basses.4.title")}</h3>
                            <p>{t("basses.4.text")}</p>
                        </div>
                        <div className="valor-item">
                            <h3>{t("basses.5.title")}</h3>
                            <p>{t("basses.5.text")}</p>
                        </div>
                        <div className="valor-item">
                            <h3>{t("basses.6.title")}</h3>
                            <p>{t("basses.6.text")}</p>
                        </div>
                    </div>
                </div>

                <div className="nossos-valores-card" ref={sectionRefs.commitment}>
                    <div className="card-icon">
                        <Book size={28} strokeWidth={1.5}/>
                    </div>
                    <h2 className="nossos-valores-subheading">{t("commitments")}</h2>
                    <p className="nossos-valores-text">
                        {t("commitments_p1")}
                    </p>
                    <p className="nossos-valores-text">
                        {t("commitments_p2")}
                    </p>
                    <div className="nossos-valores-cta">
                        <button
                            className="cta-button"
                            onClick={handleNavigateToMentorias}
                        >
                            {t("more_info")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NossosValores;