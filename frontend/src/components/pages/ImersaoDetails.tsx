import React, {useState} from "react";
import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom";
import Footer from "./Footer";
import {ChevronDown, X, ZoomIn} from "lucide-react";
import "../../styles/pages/imersaoDetails.css";
import {useTranslation} from "react-i18next";

const ImersaoDetails = () => {
    // State for expanded image
    const [expandedImage, setExpandedImage] = useState<string | null>(null);
    const navigate = useNavigate();

    // Animation variants
    const pageVariants = {
        initial: {opacity: 0},
        animate: {opacity: 1, transition: {duration: 0.6}},
        exit: {opacity: 0, transition: {duration: 0.3}}
    };

    const contentVariants = {
        initial: {y: 20, opacity: 0},
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.7,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    // Gallery images
    const galleryImages = [
        "/src/assets/galleryPse/img7.jpeg",
        "/src/assets/galleryPse/img2.jpeg",
        "/src/assets/galleryPse/img3.jpeg",
        "/src/assets/galleryPse/img4.jpeg",
        "/src/assets/galleryPse/img5.jpeg",
        "/src/assets/galleryPse/img6.jpeg",
    ];

    // Handle image click
    const handleImageClick = (image: string) => {
        setExpandedImage(image);
    };

    // Close expanded image
    const closeExpandedImage = () => {
        setExpandedImage(null);
    };

    // Handle button click to navigate to contact page
    const handleButtonClick = () => {
        navigate('/contact');
    };

    const {t} = useTranslation();


    return (
        <motion.div
            className="imersao-details-container"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
        >
            <section
                className="imersao-hero"
                style={{
                    backgroundImage: "url('/src/assets/galleryPse/img7.jpeg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="imersao-hero-content">
                    <span className="badge">{t("imerssion_program")}</span>
                    <h1>{t("imerssion_h1")}</h1>
                    <p>{t("imerssion_p")}</p>
                </div>
            </section>

            <motion.section
                className="imersao-overview"
                variants={contentVariants}
                initial="initial"
                animate="animate"
            >
                <div className="container">
                    <h2 className="overview-title">{t("imerssion_geral_h1")}</h2>

                    <div className="overview-text">
                        <p>
                            {t("imerssion_geral_p")}
                        </p>
                    </div>

                    <div className="highlights-container">
                        <div className="highlight-item">
                            <div className="highlight-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                                </svg>
                            </div>
                            <div className="highlight-content">
                                <h4>{t("imerssion_geral_cards.1.title")}</h4>
                                <p>{t("imerssion_geral_cards.1.text")}</p>
                            </div>
                        </div>

                        <div className="highlight-item">
                            <div className="highlight-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                            </div>
                            <div className="highlight-content">
                                <h4>{t("imerssion_geral_cards.2.title")}</h4>
                                <p>{t("imerssion_geral_cards.2.text")}</p>
                            </div>
                        </div>

                        <div className="highlight-item">
                            <div className="highlight-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round">
                                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                    <line x1="8" y1="21" x2="16" y2="21"></line>
                                    <line x1="12" y1="17" x2="12" y2="21"></line>
                                </svg>
                            </div>
                            <div className="highlight-content">
                                <h4>{t("imerssion_geral_cards.3.title")}</h4>
                                <p>{t("imerssion_geral_cards.3.text")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            <motion.section
                className="imersao-formats"
                variants={contentVariants}
                initial="initial"
                animate="animate"
            >
                <div className="container">
                    <h2>{t("formats.disponibles.title")}</h2>

                    <div className="formats-grid">
                        <div className="format-card">
                            <div className="format-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <h3>{t("formats.disponibles.list.1.title")}</h3>
                            <p>{t("formats.disponibles.list.1.text")}</p>
                            <ul>
                                <li>{t("formats.disponibles.list.1.li.1")}</li>
                                <li>{t("formats.disponibles.list.1.li.2")}</li>
                                <li>{t("formats.disponibles.list.1.li.3")}</li>
                                <li>{t("formats.disponibles.list.1.li.4")}</li>
                            </ul>
                            <button className="imersao-details-cta-button"
                                    onClick={handleButtonClick}>{t("more_info")}</button>
                        </div>

                        <div className="format-card">
                            <div className="format-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                            </div>
                            <h3>{t("formats.disponibles.list.2.title")}</h3>
                            <p>{t("formats.disponibles.list.2.text")}</p>
                            <ul>
                                <li>{t("formats.disponibles.list.2.li.1")}</li>
                                <li>{t("formats.disponibles.list.2.li.2")}</li>
                                <li>{t("formats.disponibles.list.2.li.3")}</li>
                                <li>{t("formats.disponibles.list.2.li.4")}</li>
                            </ul>
                            <button className="imersao-details-cta-button"
                                    onClick={handleButtonClick}>{t("more_info")}</button>
                        </div>

                        <div className="format-card">
                            <div className="format-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                            </div>
                            <h3>{t("formats.disponibles.list.3.title")}</h3>
                            <p>{t("formats.disponibles.list.3.text")}</p>
                            <ul>
                                <li>{t("formats.disponibles.list.3.li.1")}</li>
                                <li>{t("formats.disponibles.list.3.li.2")}</li>
                                <li>{t("formats.disponibles.list.3.li.3")}</li>
                                <li>{t("formats.disponibles.list.3.li.4")}</li>
                            </ul>
                            <button className="imersao-details-cta-button"
                                    onClick={handleButtonClick}>{t("more_info")}</button>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* How It Works section */}
            <motion.section
                className="imersao-how-it-works"
                variants={contentVariants}
                initial="initial"
                animate="animate"
            >
                <div className="container">
                    <h2>{t("functions.title")}</h2>

                    <div className="how-it-works-grid">
                        <div className="how-it-works-step">
                            <div className="step-number">1</div>
                            <div className="step-content">
                                <h3>{t("functions.list.1.title")}</h3>
                                <p>{t("functions.list.1.text")}</p>
                            </div>
                        </div>

                        <div className="how-it-works-step">
                            <div className="step-number">2</div>
                            <div className="step-content">
                                <h3>{t("functions.list.2.title")}</h3>
                                <p>{t("functions.list.2.text")}</p>
                            </div>
                        </div>

                        <div className="how-it-works-step">
                            <div className="step-number">3</div>
                            <div className="step-content">
                                <h3>{t("functions.list.3.title")}</h3>
                                <p>{t("functions.list.3.text")}</p>
                            </div>
                        </div>

                        <div className="how-it-works-step">
                            <div className="step-number">4</div>
                            <div className="step-content">
                                <h3>{t("functions.list.4.title")}</h3>
                                <p>{t("functions.list.4.text")}</p>
                            </div>
                        </div>

                        <div className="how-it-works-step">
                            <div className="step-number">5</div>
                            <div className="step-content">
                                <h3>{t("functions.list.5.title")}</h3>
                                <p>{t("functions.list.5.text")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Gallery Section with clickable images */}
            <motion.section
                className="imersao-gallery"
                variants={contentVariants}
                initial="initial"
                animate="animate"
            >
                <div className="container">
                    <h2>{t("space")}</h2>

                    <div className="gallery-grid">
                        {galleryImages.map((image, index) => (
                            <div className="gallery-item" key={index} onClick={() => handleImageClick(image)}>
                                <div className="gallery-image" style={{backgroundImage: `url(${image})`}}>
                                    <div className="gallery-overlay">
                                        <div className="gallery-zoom">
                                            <ZoomIn size={24}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Expanded Image Modal */}
                    {expandedImage && (
                        <div className="expanded-image-modal" onClick={closeExpandedImage}>
                            <div className="expanded-image-container">
                                <img src={expandedImage} alt="Expanded view"/>
                                <button className="close-expanded-image" onClick={closeExpandedImage}>
                                    <X size={24}/>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </motion.section>

            {/* Next Steps Section */}
            <motion.section
                className="imersao-next-steps"
                variants={contentVariants}
                initial="initial"
                animate="animate"
            >
                <div className="container">
                    <h2>{t("steps.title")}</h2>

                    <div className="next-steps-content">
                        {/* Replace this div with an actual image */}
                        <div className="next-steps-image">
                            <img
                                src="/src/assets/galleryPse/img1.jpeg"  // Update this path to your actual image
                                alt="Próximos passos da imersão"
                                className="next-steps-visual"
                            />
                        </div>
                        <div className="next-steps-text">
                            <h3>{t("steps.h3")}</h3>
                            <p>{t("steps.p")}</p>

                            <ol className="next-steps-list">
                                <li>
                                    <strong>{t("steps.list.1.strong")}</strong> - {t("steps.list.1.text")}
                                </li>
                                <li>
                                    <strong>{t("steps.list.2.strong")}</strong> - {t("steps.list.2.text")}
                                </li>
                                <li>
                                    <strong>{t("steps.list.3.strong")}</strong> - {t("steps.list.3.text")}
                                </li>
                                <li>
                                    <strong>{t("steps.list.4.strong")}</strong> - {t("steps.list.4.text")}
                                </li>
                            </ol>

                            <div className="next-steps-cta">
                                <button className="imersao-details-primary-button"
                                        onClick={handleButtonClick}>{t("more_info")}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            <motion.section
                className="imersao-cta"
                variants={contentVariants}
                initial="initial"
                animate="animate"
            >
                <div className="container">
                    <div className="cta-content">
                        <h2>{t("imerssion_contact_us.title")}</h2>
                        <p>{t("imerssion_contact_us.text")}</p>
                        <div className="cta-buttons">
                            <button className="imersao-details-secondary-button"
                                    onClick={handleButtonClick}>{t("more_info")}</button>
                        </div>
                    </div>
                </div>
            </motion.section>

            <Footer/>
        </motion.div>
    );
};

export default ImersaoDetails;