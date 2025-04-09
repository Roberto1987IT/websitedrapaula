import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import '../../styles/pages/aboutDetail.css';
import aboutImage from "../../assets/about/Design sem nome 1.png";

const AboutDetail = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-detail">
      <div className="container">
        <div className="about-detail-content">
          <Link
            to="/"
            className="back-link"
            aria-label="Voltar para a página inicial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Voltar
          </Link>

          <div className="about-main-content">
            <div className="about-profile-section">
              <div className="about-image-container">
                <img
                  src={aboutImage} //  <-----  HERE IS THE FIX: Use the imported variable
                  alt="Paula Serrano"
                  className="about-profile-image"
                />
              </div>
              <div className="about-intro">
                <span className="about-tag">Biografia</span>
                <h1 className="about-heading">Paula Serrano</h1>
              </div>
            </div>

            <div className="about-card about-text">
              <p>Paula Serrano – Terapeuta Ocupacional desde 1993. Com um mestrado em Terapia Ocupacional – Área de especialização Integração Sensorial, pela Escola Superior de Saúde do Alcoitão.</p>

              <p>É certificada em Integração Sensorial pela University of Southern California – Department of Occupational Science and Therapy e Western Psychological Services. É também certificada no tratamento do neuro desenvolvimento (Bobath) pela European Bobath Tutors' Association.</p>

              <p>Tem 30 anos de experiência de prática clínica com crianças e famílias.</p>

              <p>É diretora clínica, coordenadora e terapeuta ocupacional do Centro de Estimulação para o Desenvolvimento e Aprendizagem «Miúdos & Etc.».</p>

              <p>É formadora certificada nas áreas específicas de desenvolvimento infantil, ensino especial, integração sensorial e brincar desde 2000. Desde 2018 mantém a atividade como formadora também no Brasil e Espanha.</p>

              <p>É professora adjunta convidada no Mestrado em Terapia Ocupacional, área de especialidade Integração Sensorial desde 2006.</p>

              <p>Coorientadora de diversas teses de mestrado, nas áreas do brincar e integração sensorial.</p>

              <h2 className="about-subheading">É autora dos livros:</h2>
              <ul className="about-list">
                <li>Serrano, P.; De Luque, C. (2015). A Criança e a Motricidade Fina. Lisboa, Portugal: Papa-Letras. (Também editado pela editora Narcea em Castelhano)</li>
                <li>Serrano, P. (2016). Integração Sensorial. Lisboa, Portugal: Papa-Letras. (Também editado pela editora Narcea em Castelhano)</li>
                <li>Serrano, P.( 2018). O Desenvolvimento da Autonomia dos 0 aos 3 anos. Lisboa, Portugal: Papa-Letras.</li>
                <li>Serrano, P. (2024). Brincar e Integração Sensorial nos Primeiros Anos de Vida. Lisboa, Portugal: Papa-Letras.</li>
              </ul>

              <h2 className="about-subheading">Autora e coautora de capítulos dos livros:</h2>
              <ul className="about-list">
                <li>Serrano, P.; Carmo, A. L. (2020). "A Influência da Integração Sensorial na autorregulação do bebé". In Uma Viagem à primeira Infância – um dia para recordar, editado por Universidade do Algarve editora, 31-39. Faro, Portugal: Universidade do Algarve editora.</li>
                <li>Serrano, P. (2021). "Brincar, desenvolvimento, saúde e bem-estar na primeira infância". In Tratado da Brinquedoteca Hospitalar, humanização teoria e prática, 148-163. Rio de Janeiro, Brasil: Wak Editora.</li>
                <li>Serrano, P.J.M.; Rocha, A.N.D.C.; Santos, C.B.A.(2022). A Integração Sensorial e Suas Interfaces com as habilidades de Comunicação In. Oliveira, J.P.; Rocha, A.N.D.C.; Martins, A.P.L.A Linguagem e o Brincar e condições neurodiversas, 145-176. Marília: Oficina Universitária.</li>
                <li>Reis, H; Serrano, P. (2023). "Disfunção de processamento sensorial e suas implicações no desempenho ocupacional da criança". in Compreendendo O Autismo: do Pensar Familiar Ao Pensar Técnico, (105- 128). Lisboa: Papa- Letras</li>
                <li>Serrano, P.; Reis H. (2023). A importância do brincar na criança com PEA. In Compreendendo O Autismo: do Pensar Familiar Ao Pensar Técnico, (129-146). Lisboa: Papa- Letras.</li>
              </ul>

              <div className="about-footer">
                <p>Ciência ID F418-5444-6081</p>
                <p>ORCID iD 0000-0002-9674-9256</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutDetail;