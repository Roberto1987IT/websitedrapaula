
import React from "react";
import { motion } from "framer-motion";
import Footer from "./Footer";
import { ChevronDown } from "lucide-react";
import "../../styles/pages/imersaoDetails.css";

const ImersaoDetails = () => {
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
      className="imersao-details-container"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <section className="imersao-hero">
        <div className="imersao-hero-content">
          <span className="badge">Programa de Imersão</span>
          <h1>Experiência Clínica Intensiva</h1>
          <p>Eleve sua prática profissional com o nosso programa de imersão especializado</p>
        </div>
      </section>

      <motion.section 
        className="imersao-overview"
        variants={contentVariants}
        initial="initial"
        animate="animate"
      >
        <div className="container">
          <div className="overview-grid">
            <div className="overview-info">
              <h2>Visão Geral</h2>
              <p>
                O nosso programa de imersão oferece uma experiência prática intensiva para 
                profissionais e estudantes que desejam melhorar as suas competencias clínicas 
                em um ambiente real e supervisionado. Durante o período de imersão, você terá 
                a oportunidade de aplicar conhecimentos teóricos em situações práticas, recebendo 
                feedback direto de supervisores experientes.
              </p>
              
              <div className="highlights">
                <div className="highlight-item">
                  <div className="highlight-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                  </div>
                  <div className="highlight-content">
                    <h4>Experiência Prática</h4>
                    <p>Aprenda na pratica, com casos reais e situações clínicas autênticas</p>
                  </div>
                </div>
                
                <div className="highlight-item">
                  <div className="highlight-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  </div>
                  <div className="highlight-content">
                    <h4>Mentoria Individualizada</h4>
                    <p>Supervisão direta com profissionais experientes e feedback contínuo</p>
                  </div>
                </div>
                
                <div className="highlight-item">
                  <div className="highlight-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                  </div>
                  <div className="highlight-content">
                    <h4>Certificação Diferenciada</h4>
                    <p>Obtenha um certificado que comprova sua experiência prática intensiva</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="overview-image">
              
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
          <h2>Formatos Disponíveis</h2>
          
          <div className="formats-grid">
            <div className="format-card">
              <div className="format-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
              </div>
              <h3>Imersão Individual</h3>
              <p>Atendimento personalizado com foco nas suas necessidades específicas</p>
              <ul>
                <li>Duração: 1 a 5 dias</li>
                <li>Programa personalizado</li>
                <li>Feedback individual detalhado</li>
                <li>Horários flexíveis</li>
              </ul>
              <button className="imersao-details-cta-button">Saiba mais</button>
            </div>
            
            <div className="format-card">
              <div className="format-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <h3>Imersão em Grupo</h3>
              <p>Experiência colaborativa com partilha de conhecimentos</p>
              <ul>
                <li>Duração: 2 a 7 dias</li>
                <li>Grupos de 3 a 8 pessoas</li>
                <li>Dinâmicas e estudos de caso</li>
                <li>Networking profissional</li>
              </ul>
              <button className="imersao-details-cta-button">Solicitar Informações</button>
            </div>
            
            <div className="format-card">
              <div className="format-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </div>
              <h3>Imersão Intensiva</h3>
              <p>Programa completo de imersão com módulos teóricos e práticos</p>
              <ul>
                <li>Duração: 1 a 4 semanas</li>
                <li>Acompanhamento integral</li>
                <li>Material didático exclusivo</li>
                <li>Certificação premium</li>
              </ul>
              <button className="imersao-details-cta-button">Mais Detalhes</button>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* New section: Como Funciona (How It Works) */}
      <motion.section 
        className="imersao-how-it-works"
        variants={contentVariants}
        initial="initial"
        animate="animate"
      >
        <div className="container">
          <h2>Como Funciona</h2>
          
          <div className="how-it-works-grid">
            <div className="how-it-works-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Avaliação Inicial</h3>
                <p>Realizamos uma entrevista para entender as suas necessidades e objetivos específicos. Esta etapa permite-nos personalizar a sua experiência de imersão e maximizar a aprendizagem.</p>
              </div>
            </div>
            
            <div className="how-it-works-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Planeamento Personalizado</h3>
                <p>Desenvolvemos um plano de imersão detalhado, incluindo cronograma, tópicos a serem abordados e metodologias que serão aplicadas durante o programa.</p>
              </div>
            </div>
            
            <div className="how-it-works-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Experiência de Imersão</h3>
                <p>Você participa das atividades programadas, alternando entre aprendizagem teórica e aplicação prática, sempre com o acompanhamento dos nossos supervisores.</p>
              </div>
            </div>
            
            <div className="how-it-works-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Feedback </h3>
                <p>Durante toda a imersão, você recebe feedback contínuo sobre seu desempenho, permitindo o seu crescimento profissional em tempo real.</p>
              </div>
            </div>
            
            <div className="how-it-works-step">
              <div className="step-number">5</div>
              <div className="step-content">
                <h3>Certificação</h3>
                <p>Ao final do programa, você recebe a sua certificação.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section 
        className="imersao-testimonials"
        variants={contentVariants}
        initial="initial"
        animate="animate"
      >
        <div className="container">
          <h2>O Que Dizem Nossos Participantes</h2>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"A imersão transformou minha visão sobre a prática clínica. A experiência hands-on e o feedback imediato dos mentores aceleraram meu desenvolvimento profissional."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <h4>Ana Carolina Silva</h4>
                  <p>Psicóloga Clínica</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"Participar da imersão em grupo foi uma experiência enriquecedora. Além do aprendizado prático, o networking com outros profissionais expandiu minha rede de contatos."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <h4>Ricardo Mendes</h4>
                  <p>Terapeuta Ocupacional</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"O programa intensivo superou todas as minhas expectativas. Em apenas duas semanas, adquiri habilidades que normalmente levariam meses para desenvolver."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <h4>Juliana Ferreira</h4>
                  <p>Estudante de Psicologia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
      
     
                
        
      {/* New section: Próximos Passos (Next Steps) */}
      <motion.section 
        className="imersao-next-steps"
        variants={contentVariants}
        initial="initial"
        animate="animate"
      >
        <div className="container">
          <h2>Próximos Passos</h2>
          
          <div className="next-steps-content">
            <div className="next-steps-image"></div>
            <div className="next-steps-text">
              <h3>Pronto para começar sua jornada de transformação profissional?</h3>
              <p>O processo para participar de nossas imersões é simples e direto:</p>
              
              <ol className="next-steps-list">
                <li>
                  <strong>Entre em contato</strong> - Agende uma consulta inicial com a nossa equipa através do formulário de contato ou telefone.
                </li>
                <li>
                  <strong>Avaliação de perfil</strong> - Realizamos uma breve entrevista para entender as suas necessidades e objetivos.
                </li>
                <li>
                  <strong>Proposta personalizada</strong> - Receba uma proposta detalhada com opções de programas, datas e investimento.
                </li>
                <li>
                  <strong>Confirme a sua participação</strong> - Efetue a reserva e prepare-se para uma experiência transformadora.
                </li>
              </ol>
              
              <div className="next-steps-cta">
                <button className="imersao-details-primary-button">Saber mais</button>
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
            <h2>Pronto para Elevar a Sua Experiência Profissional?</h2>
            <p>Entre em contato para mais informações sobre nossos programas de imersão e agende uma consulta com nossos especialistas.</p>
            <div className="cta-buttons">
              
              <button className="imersao-details-secondary-button">Solicitar Informações</button>
            </div>
          </div>
        </div>
      </motion.section>

      <Footer />
    </motion.div>
  );
};

export default ImersaoDetails;