import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, ShoppingCart, Phone } from "lucide-react";
import "../../styles/pages/mentorshipDetail.css";
import mentorshipImage from "../../assets/courses/PaulaSerrano-102 1.png";

const MentorshipDetails = () => {
  const navigate = useNavigate();
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  const handleBackClick = () => {
    navigate('/');
  };

  const faqs = [
    {
      question: "Como funciona o processo de mentoria?",
      answer: "O processo de mentoria inicia com uma avaliação do seu perfil e objetivos profissionais. Em seguida, estabelecemos um plano personalizado com encontros regulares onde você receberá orientação, feedback e desafios para acelerar seu desenvolvimento."
    },
    {
      question: "Qual é a duração da mentoria?",
      answer: "A duração da mentoria sera definida apos a avaliacao das necessidades."
    },
    {
      question: "Quais são os pré-requisitos para participar?",
      answer: "Não existem pré-requisitos formais, apenas o compromisso com seu desenvolvimento e disponibilidade para os encontros que forem agendados."
    },
    {
      question: "Como são realizados os encontros?",
      answer: "Os encontros são realizados remotamente através de plataformas de videoconferência como Zoom ou Google Meet, permitindo flexibilidade e conveniência para todos os participantes."
    }
  ];

  return (
    <div className="mentorship-details">
      <div className="mentorship-details-header">
        <span className="mentorship-details-tag">Programa de Mentoria</span>
        <h1 className="mentorship-details-title">Mentoria Profissional Personalizada</h1>
        <p className="mentorship-details-subtitle">
          Desenvolva suas habilidades e acelere sua carreira com orientação especializada
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
            <h3>O Programa</h3>
            <p>
              Nossa mentoria profissional foi desenvolvida para profissionais que buscam acelerar o desenvolvimento de suas carreiras através de orientação personalizada. Com encontros semanais e acompanhamento contínuo, você terá acesso a insights valiosos e estratégias práticas para atingir seus objetivos profissionais.
            </p>
          </div>

          <div className="mentorship-details-section">
            <h3>Benefícios</h3>
            <ul>
              <li>Visão personalizada sobre seu desenvolvimento profissional</li>
              <li>Feedback sincero e construtivo sobre seus pontos fortes e áreas de melhoria</li>
              <li>Acesso a redes profissionais e oportunidades exclusivas</li>
              <li>Desenvolvimento acelerado de competências técnicas</li>
              
            </ul>
          </div>

          <div className="mentorship-details-section">
            <h3>Metodologia</h3>
            <p>
              Nossa metodologia combina sessões individuais de mentoria, exercícios práticos e projetos aplicados ao seu contexto profissional. Trabalhamos com uma abordagem estruturada em 3 fases:
            </p>
            <ul>
              <li>Diagnóstico e definição de objetivos claros</li>
              <li>Desenvolvimento de estratégias e plano de ação</li>
              <li>Implementação e avaliação de resultados</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mentorship-purchase">
        <div className="mentorship-price">499,90</div>
        <p className="mentorship-price-info">Investimento único para o programa completo</p>
        
        <div className="mentorship-purchase-buttons">
          <button className="mentorship-buy-button">
            <ShoppingCart size={20} />
            Inscrever-se agora
          </button>
          <button className="mentorship-contact-button">
            <Phone size={20} />
            Informacao
          </button>
        </div>
      </div>

      <div className="mentorship-testimonials">
        <h2 className="mentorship-testimonials-title">O que dizem nossos mentorados</h2>
        
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <div className="testimonial-text">
              A mentoria transformou minha visão sobre carreira. Em apenas 3 meses, consegui identificar oportunidades que nunca havia notado antes e desenvolver habilidades cruciais para meu crescimento profissional.
            </div>
            <div className="testimonial-author">
              <div className="testimonial-author-info">
                <div className="testimonial-author-name">Ana Paula Silva</div>
                <div className="testimonial-author-role">Gerente de Marketing</div>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="testimonial-text">
              O programa superou todas as minhas expectativas. O acompanhamento personalizado me ajudou a traçar um plano claro de desenvolvimento e a conquistar uma promoção que estava buscando há anos.
            </div>
            <div className="testimonial-author">
              <div className="testimonial-author-info">
                <div className="testimonial-author-name">Carlos Eduardo</div>
                <div className="testimonial-author-role">Analista de Sistemas</div>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="testimonial-text">
              Participar da mentoria foi um divisor de águas na minha carreira. Obtive insights valiosos sobre como me posicionar profissionalmente e desenvolver minhas competências de liderança.
            </div>
            <div className="testimonial-author">
              <div className="testimonial-author-info">
                <div className="testimonial-author-name">Juliana Mendes</div>
                <div className="testimonial-author-role">Coordenadora de Projetos</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mentorship-faq">
        <h2 className="mentorship-faq-title">Perguntas Frequentes</h2>
        
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`faq-item ${activeFaqIndex === index ? 'active' : ''}`}
            onClick={() => toggleFaq(index)}
          >
            <div className="faq-question">
              {faq.question}
              {activeFaqIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            <div className="faq-answer">
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorshipDetails;