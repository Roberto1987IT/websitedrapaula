import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/pages/testemunhos.css";
import {useTranslation} from "react-i18next";

// Sample Testimonials Data with more detailed comments
const testemunhos = [
    {
        id: 1,
        comment: "A metodologia é muito prática e facilmente aplicável no dia a dia. Superou minhas expectativas!",
        rating: 5,
        name: "Rita Maria",
        role: ""
    },
    {
        id: 2,
        comment: "Conteúdo excelente e bem estruturado. Consegui implementar os conhecimentos rapidamente.",
        rating: 4,
        name: "João Pedro",
        role: ""
    },
    {
        id: 3,
        comment: "Aprendi muito mais do que esperava. As técnicas ensinadas são valiosas para qualquer profissional.",
        rating: 5,
        name: "Mariana Silva",
        role: ""
    },
    {
        id: 4,
        comment: "Explicação clara e objetiva. Consegui entender conceitos complexos de forma simples.",
        rating: 4,
        name: "Carlos Lima",
        role: ""
    },
    {
        id: 5,
        comment: "Excelente didática e atenção aos detalhes. Paula tem um dom para ensinar!",
        rating: 5,
        name: "Ana Paula",
        role: ""
    },
    {
        id: 6,
        comment: "Recomendo a todos que querem evoluir na carreira! Curso transformador e prático.",
        rating: 5,
        name: "Fernanda Souza",
        role: ""
    },
    {
        id: 7,
        comment: "Ótimo curso com conteúdo relevante e atual. Aplicação imediata no mercado.",
        rating: 4,
        name: "João Vitor",
        role: ""
    },
    {
        id: 8,
        comment: "O melhor curso que já fiz! A Paula tem uma capacidade incrível de transmitir conhecimento.",
        rating: 5,
        name: "Clara Mendes",
        role: ""
    },
];

// Enhanced Star Rating Component
const StarRating = ({rating}: { rating: number }) => {
    return (
        <div className="stars" aria-label={`${rating} de 5 estrelas`}>
            {Array.from({length: 5}).map((_, index) => (
                <span key={index} className={index < rating ? "star filled" : "star"}>
          ★
        </span>
            ))}
        </div>
    );
};

// Testimonials Component
const Testemunhos = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false,
                },
            },
        ],
    };

    const {t} = useTranslation()
    return (
        <section className="testemunhos-section" id="testemunhos">
            <div className="testemunhos-container">
                <div className="testemunhos-header">
                    <h2 className="testemunhos-title">{t("folowers_h2")}</h2>
                    <p className="testemunhos-subtitle">
                        {t("folowers_p")}
                    </p>
                </div>

                <div className="testemunhos-slider-container">
                    <Slider {...settings} className="testemunhos-slider">
                        {testemunhos.map((testemunho) => (
                            <div key={testemunho.id} className="testemunho-slide">
                                <div className="testemunho-card">
                                    <div className="testemunho-content">
                                        <div className="testemunho-quote-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                 fill="currentColor" className="quote-icon">
                                                <path
                                                    d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
                                            </svg>
                                        </div>
                                        <p className="testemunho-text">{t(`folowers.${testemunho.id}.comment`)}</p>
                                        <div className="testemunho-rating">
                                            <StarRating rating={testemunho.rating}/>
                                        </div>
                                        <div className="testemunho-author">
                                            <h3 className="testemunho-name">{testemunho.name}</h3>
                                            <p className="testemunho-role">{testemunho.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default Testemunhos;
