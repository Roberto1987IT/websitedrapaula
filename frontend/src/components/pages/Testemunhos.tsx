import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/pages/testemunhos.css";

// Sample Testimonials Data with more detailed comments
const testemunhos = [
  { 
    id: 1, 
    comment: "O teu caminho evolutivo enche o meu coração. Gratidão pelo teu contributo para com o cuidado e desenvolvimento saudável da Vida, Paula 🤍🌱🌍✨",
    rating: 5, 
    name: "Rita Maria",
    role: "Empreendedora"
  },
  { 
    id: 2, 
    comment: "Um projecto extremamente necessário e que vem colmatar a lacuna existente na nossa região 🎊👏🏼",
    rating: 4, 
    name: "João Pedro",
    role: "Empresário"
  },
  { 
    id: 3, 
    comment: "💚 Que recomendação tão útil! 💚 Adoro como juntas conhecimento especializado com práticas do dia a dia. A autonomia é mesmo um dos pilares para um desenvolvimento saudável. 🌟 Vou espreitar a sugestão! 👏",
    rating: 5, 
    name: "Mariana Silva",
    role: "Consultora"
  },
  { 
    id: 4, 
    comment: "Paula, seus livros são ótimos, tenho todos e fico sempre aguardando um outro. Você é uma profissional maravilhosa!!!! 👏👏👏👏👏👏👏👏OBRIGADA!",
    rating: 4, 
    name: "Carlos Lima",
    role: "Gestor"
  },
  { 
    id: 5, 
    comment: "Dra Paula Serrano uma profissional incrível, tive o prazer de participar de uma formação em Portugal com ela.\n" +
        "Uma pessoa de um conhecimento ímpar e de uma simplicidade que poucos profissionais são.\n" +
        "Sou muito sua Fã 😍 sucesso em nossa terrinha",
    rating: 5, 
    name: "Ana Paula",
    role: "Professora"
  },
  { 
    id: 6, 
    comment: "Parabéns Paula, sempre possibilitando espaços que valorizam a reflexão do brincar no raciocínio clínico da terapia ocupacional 😍🙏",
    rating: 5, 
    name: "Fernanda Souza",
    role: "Analista"
  },
  { 
    id: 7, 
    comment: "Livro rico em teoria e chegou super rápido! Amei!",
    rating: 5,
    name: "Fernanda Fernandes",
    role: "Psicóloga"
  },
  { 
    id: 8, 
    comment: "Muito detalhista na explicação do desenvolvimento infantil. Super indico.",
    rating: 5, 
    name: "Valéria Santos",
    role: "Coordenadora"
  },
];

// Enhanced Star Rating Component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="stars" aria-label={`${rating} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, index) => (
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

  return (
    <section className="testemunhos-section" id="testemunhos">
      <div className="testemunhos-container">
        <div className="testemunhos-header">
          <h2 className="testemunhos-title">O que dizem sobre nós</h2>
          <p className="testemunhos-subtitle">
            Conheça a experiência de nossos clientes com nossos cursos e mentorias
          </p>
        </div>

        <div className="testemunhos-slider-container">
          <Slider {...settings} className="testemunhos-slider">
            {testemunhos.map((testemunho) => (
              <div key={testemunho.id} className="testemunho-slide">
                <div className="testemunho-card">
                  <div className="testemunho-content">
                    <div className="testemunho-quote-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="quote-icon">
                        <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                      </svg>
                    </div>
                    <p className="testemunho-text">{testemunho.comment}</p>
                    <div className="testemunho-rating">
                      <StarRating rating={testemunho.rating} />
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
