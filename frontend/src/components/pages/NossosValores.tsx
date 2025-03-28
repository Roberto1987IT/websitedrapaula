import React, { useEffect, useRef } from "react";
import { Heart, Lightbulb, Book } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/nossosValores.css";

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
      { threshold: 0.1 }
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

  return (
    <div className="nossos-valores-wrapper">
      <div className="nossos-valores-hero">
        <div className="nossos-valores-hero-content">
          <span className="nossos-valores-tag">Nossa Filosofia</span>
          <h1 className="nossos-valores-heading">Nosso Valores</h1>
          <p className="nossos-valores-subtitle">
            Princípios fundamentais que guiam cada decisão e iniciativa
          </p>
        </div>
      </div>

      <div className="nossos-valores-container" ref={sectionRefs.main}>
        <div className="nossos-valores-intro">
          <p className="nossos-valores-text highlight">
            Acreditamos que o investimento na infância é o caminho para transformar a sociedade.
            Cada criança representa um potencial único que, quando nutrido adequadamente, 
            contribui para um futuro mais justo e humano.
          </p>
        </div>

        <div className="nossos-valores-card" ref={sectionRefs.mission}>
          <div className="card-icon">
            <Heart size={28} strokeWidth={1.5} />
          </div>
          <h2 className="nossos-valores-subheading">Missão</h2>
          <p className="nossos-valores-text">
            Valorizamos a partilha de conhecimento como uma ferramenta poderosa para ampliar horizontes e trazer mais qualidade de vida às famílias. Acreditamos que, ao disseminar saberes, podemos criar um impacto positivo que vai muito além do indivíduo, alcançando comunidades inteiras.
          </p>
          <p className="nossos-valores-text">
            Buscamos criar um ambiente onde cada criança possa florescer em seu próprio ritmo, respeitando sua individualidade e apoiando seu desenvolvimento integral. Nossa abordagem reconhece que cada jornada de crescimento é única.
          </p>
        </div>

        <div className="nossos-valores-card" ref={sectionRefs.values}>
          <div className="card-icon">
            <Lightbulb size={28} strokeWidth={1.5} />
          </div>
          <h2 className="nossos-valores-subheading">Princípios Fundamentais</h2>
          <div className="valores-grid">
            <div className="valor-item">
              <h3>Inovação</h3>
              <p>Buscamos constantemente novas abordagens e metodologias para aprimorar nossas práticas educativas.</p>
            </div>
            <div className="valor-item">
              <h3>Integridade</h3>
              <p>Agimos com transparência e honestidade em todas as nossas interações e decisões.</p>
            </div>
            <div className="valor-item">
              <h3>Empatia</h3>
              <p>Colocamo-nos no lugar do outro para compreender suas necessidades e desafios únicos.</p>
            </div>
            <div className="valor-item">
              <h3>Excelência</h3>
              <p>Comprometemo-nos com os mais altos padrões de qualidade em tudo o que fazemos.</p>
            </div>
            <div className="valor-item">
              <h3>Colaboração</h3>
              <p>Valorizamos o trabalho em equipe e a troca de ideias para alcançar resultados significativos.</p>
            </div>
            <div className="valor-item">
              <h3>Respeito</h3>
              <p>Reconhecemos e valorizamos a diversidade de experiências e perspectivas em nossa comunidade.</p>
            </div>
          </div>
        </div>

        <div className="nossos-valores-card" ref={sectionRefs.commitment}>
          <div className="card-icon">
            <Book size={28} strokeWidth={1.5} />
          </div>
          <h2 className="nossos-valores-subheading">Nosso Compromisso</h2>
          <p className="nossos-valores-text">
            Por meio de cursos, mentorias e materiais didáticos, o nosso objetivo é capacitar profissionais nas suas práticas diárias. Oferecemos ferramentas para que eles apoiem crianças e famílias na sua jornada de crescimento e desenvolvimento. Assim, buscamos contribuir para que cada ser humano alcance seu máximo potencial, respeitando sua singularidade e promovendo uma sociedade mais inclusiva e fortalecida.
          </p>
          <p className="nossos-valores-text">
            Estamos comprometidos em criar recursos acessíveis e programas que inspirem educadores e famílias a trabalharem juntos pelo bem-estar das crianças. Acreditamos que através desta colaboração podemos construir as bases para um futuro onde todas as crianças tenham a oportunidade de prosperar.
          </p>
          <div className="nossos-valores-cta">
            <button 
              className="cta-button"
              onClick={handleNavigateToMentorias}
            >
              Conheça Nossos Programas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NossosValores;