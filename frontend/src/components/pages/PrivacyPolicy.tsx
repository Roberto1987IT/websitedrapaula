import React, { useEffect, useRef } from "react";
import "../../styles/pages/privacyPolicy.css";

const PrivacyPolicy = () => {
  // Fix the TypeScript typing for the refs array
  const sectionsRef = useRef<Array<HTMLElement | null>>([]);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Add animation for sections as they appear in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Only observe non-null elements
    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });
    
    return () => {
      // Cleanup observer
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);
  
  // Function to help with ref assignments
  const setRef = (index: number) => (el: HTMLElement | null) => {
    sectionsRef.current[index] = el;
  };
  
  return (
    <div className="privacy-container">
      <div className="privacy-content">
        <h1 className="privacy-title">Política de Cookies</h1>
        
        <section 
          className="animate-on-load" 
          ref={setRef(0)}
        >
          <p className="privacy-paragraph">
            Esta Política de Cookies explica como nosso site utiliza cookies e tecnologias similares 
            para reconhecer você quando visita nosso site. Ela explica o que são essas tecnologias 
            e por que as usamos, bem como seus direitos para controlar nosso uso delas.
          </p>
        </section>
        
        <section 
          className="animate-on-load" 
          ref={setRef(1)}
        >
          <h2 className="privacy-heading">O que são cookies?</h2>
          <p className="privacy-paragraph">
            Cookies são pequenos arquivos de dados que são colocados no seu computador ou dispositivo 
            móvel quando você visita um site. Eles são amplamente utilizados para fazer com que os 
            sites funcionem, ou funcionem de forma mais eficiente, bem como para fornecer informações 
            aos proprietários do site.
          </p>
        </section>
        
        <section 
          className="animate-on-load" 
          ref={setRef(2)}
        >
          <h2 className="privacy-heading">Por que usamos cookies?</h2>
          <p className="privacy-paragraph">
            Usamos cookies por vários motivos. Alguns cookies são necessários por razões técnicas para 
            que nosso site funcione, e nos referimos a esses como cookies "essenciais" ou "estritamente 
            necessários". Outros cookies nos permitem rastrear e direcionar os interesses de nossos 
            usuários para melhorar a experiência em nosso site. Terceiros podem servir cookies através 
            de nosso site para publicidade, análise e outros fins.
          </p>
        </section>
        
        <section 
          className="animate-on-load" 
          ref={setRef(3)}
        >
          <h2 className="privacy-heading">Tipos de cookies que usamos</h2>
          <ul className="privacy-list">
            <li className="privacy-list-item">
              <span className="list-item-title">Cookies Essenciais:</span> Estes cookies são necessários 
              para fornecer a você serviços disponíveis através do nosso site e para usar algumas de suas 
              funcionalidades, como acesso a áreas seguras.
            </li>
            <li className="privacy-list-item">
              <span className="list-item-title">Cookies de Desempenho e Funcionalidade:</span> Estes cookies 
              são usados para melhorar o desempenho e a funcionalidade do nosso site, mas não são essenciais 
              para seu uso. No entanto, sem esses cookies, certas funcionalidades podem ficar indisponíveis.
            </li>
            <li className="privacy-list-item">
              <span className="list-item-title">Cookies de Análise e Personalização:</span> Estes cookies 
              coletam informações que são usadas de forma agregada para nos ajudar a entender como nosso 
              site está sendo usado ou quão eficazes são nossas campanhas de marketing, ou para nos ajudar 
              a personalizar nosso site para você.
            </li>
            <li className="privacy-list-item">
              <span className="list-item-title">Cookies de Publicidade:</span> Estes cookies são usados para 
              tornar as mensagens publicitárias mais relevantes para você. Eles executam funções como impedir 
              que o mesmo anúncio reapareça continuamente, garantir que os anúncios sejam exibidos corretamente 
              para os anunciantes e, em alguns casos, selecionar anúncios baseados em seus interesses.
            </li>
          </ul>
        </section>
        
        <section 
          className="animate-on-load" 
          ref={setRef(4)}
        >
          <h2 className="privacy-heading">Como posso controlar os cookies?</h2>
          <p className="privacy-paragraph">
            Você tem o direito de decidir se aceita ou rejeita cookies. Você pode exercer suas preferências 
            de cookies clicando nos botões "Aceitar" ou "Recusar" no banner de consentimento de cookies que 
            aparece ao visitar nosso site.
          </p>
          <p className="privacy-paragraph">
            Além disso, a maioria dos navegadores permite que você controle os cookies através de suas 
            configurações. Para saber mais sobre cookies, incluindo como ver quais cookies foram definidos 
            e como gerenciá-los e excluí-los, visite{" "}
            <a href="http://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="privacy-link">
              www.aboutcookies.org
            </a>{" "}
            ou{" "}
            <a href="http://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="privacy-link">
              www.allaboutcookies.org
            </a>.
          </p>
        </section>
        
        <section 
          className="animate-on-load" 
          ref={setRef(5)}
        >
          <h2 className="privacy-heading">Contato</h2>
          <p className="privacy-paragraph">
            Se você tiver alguma dúvida sobre nosso uso de cookies ou outras tecnologias, entre em 
            contato conosco em{" "}
            <a href="mailto:paulaserranoeducacao@gmail.com" className="privacy-link">
              paulaserranoeducacao@gmail.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;