import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "./Footer";
import "../../styles/pages/lancamentoDetail.css";
import modulo1 from "../../assets/lancamentos/modulo1.jpg";
import modulo2 from "../../assets/courses/curso2.jpg";
import modulo3 from "../../assets/lancamentos/modulo3.jpg";
import modulo4 from "../../assets/courses/curso5.jpg";

const lancamentos = [
  { 
    image: modulo3, 
    title: "Módulo 3: Brincar da teoria à prática em terapia ocupacional.",
    description: "Este módulo explora profundamente a aplicação do brincar na terapia ocupacional, conectando teoria avançada com estratégias práticas. Ideal para profissionais que buscam expandir seu repertório terapêutico.",
    benefits: [
      "Compreensão aprofundada do desenvolvimento do brincar",
      "Estratégias práticas baseadas em evidências",
      "Estudos de caso e exemplos reais",
      "Material complementar exclusivo"
    ],
    price: "R$297,00",
    installments: "12x de R$24,75"
  },
  { 
    image: modulo2, 
    title: "Conteudos Programaticos Brincar e TO Teoria e Pratica.",
    description: "Uma abordagem completa sobre os conteúdos programáticos relacionados ao brincar na terapia ocupacional. Perfeito para estudantes e profissionais que desejam uma base sólida nesta área essencial.",
    benefits: [
      "Fundamentação teórica abrangente",
      "Metodologias de avaliação do brincar",
      "Planejamento de intervenções estruturadas",
      "Certificação reconhecida"
    ],
    price: "R$247,00",
    installments: "12x de R$20,58"
  },
  { 
    image: modulo1, 
    title: "Módulo 1: Brincar da teoria à prática em terapia ocupacional.",
    description: "O módulo introdutório que oferece uma visão geral sobre a importância do brincar na terapia ocupacional, estabelecendo as bases para uma prática efetiva e fundamentada.",
    benefits: [
      "Introdução aos conceitos fundamentais",
      "Relação entre desenvolvimento infantil e o brincar",
      "Técnicas iniciais de intervenção",
      "Recursos práticos para implementação imediata"
    ],
    price: "R$197,00",
    installments: "12x de R$16,42"
  },
  { 
    image: modulo4, 
    title: "Integracao Sensorial: Avaliacao e Raciocínio Clinico.",
    description: "Um curso focado nas técnicas de avaliação e raciocínio clínico na integração sensorial, fornecendo ferramentas práticas para identificação e intervenção em desafios sensoriais.",
    benefits: [
      "Protocolos de avaliação sensorial",
      "Desenvolvimento de raciocínio clínico estruturado",
      "Estratégias de intervenção personalizadas",
      "Abordagem multidisciplinar integrada"
    ],
    price: "R$397,00",
    installments: "12x de R$33,08"
  },
];

const LancamentoDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const lancamentoIndex = id ? parseInt(id) : 0;
  const lancamento = lancamentos[lancamentoIndex];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!lancamento) {
    return (
      <div className="lancamento-details-error">
        <h2>Lançamento não encontrado</h2>
        <button onClick={() => navigate('/')} className="back-button">Voltar para a página inicial</button>
      </div>
    );
  }

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const contentVariants = {
    initial: { y: 20, opacity: 0 },
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

  return (
    <motion.div
      className="lancamento-details-container"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <section className="lancamento-details-hero">
        <div className="lancamento-details-hero-content">
          <span className="lancamento-details-badge">Novo Lançamento</span>
          <h1>{lancamento.title}</h1>
          <p>Transforme sua prática profissional com nosso material especializado</p>
        </div>
      </section>


      <motion.section 
        className="lancamento-details-overview"
        variants={contentVariants}
        initial="initial"
        animate="animate"
      >
        <div className="container">
          <div className="overview-grid">

            <div className="overview-info">
              <h2>Visão Geral</h2>
              <p>{lancamento.description}</p>
              
              <div className="price-container">
                <div className="price-tag">
                  <span className="price-value">{lancamento.price}</span>
                  <span className="price-installments">ou {lancamento.installments}</span>
                </div>
                <button className="buy-now-button">
                  Comprar Agora
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
              </div>
              
              <div className="benefits-container">
                <h3>O que você vai aprender</h3>
                <ul className="benefits-list">
                  {lancamento.benefits.map((benefit, index) => (
                    <li key={index} className="benefit-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="overview-image">
              <img 
                src={lancamento.image} 
                alt={lancamento.title} 
                className="lancamento-details-img"
              />
            </div>
          </div>
        </div>

      </motion.section>

      <motion.section 
        className="lancamento-details-cta"
        variants={contentVariants}
        initial="initial"
        animate="animate"
      >
        <div className="container">
          <div className="cta-content">
            <h2>Pronto para Elevar Seu Conhecimento Profissional?</h2>
            <p>Adquira agora este material e comece a transformar sua prática na terapia ocupacional.</p>
            <div className="cta-buttons">
              <button className="primary-button">
                Comprar Agora
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
              <button className="secondary-button" onClick={() => navigate('/')} >
                Voltar
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      <Footer />
    </motion.div>
  );
};

export default LancamentoDetails;




