import React from "react";
import "../styles/TermosCondicoes.css";

const TermosCondicoes = () => {
  return (
    <div className="termos-wrapper">
      <div className="termos-condicoes-container">
        <header className="termos-header">
          <h1>Termos e Condições</h1>
          <p className="company-name"><strong>Paula Serrano Educação</strong></p>
          <p className="update-date"><em>Última atualização: 02/04/2025</em></p>
        </header>

        <section className="termos-section">
          <h2>1. Introdução</h2>
          <p>
            Bem-vindo ao website da Paula Serrano Educação, Lda. Ao aceder e utilizar este website, o utilizador concorda em cumprir os presentes Termos e Condições de Utilização.
          </p>
        </section>

        <section className="termos-section">
          <h2>2. Propriedade Intelectual</h2>
          <p>
            Todo o conteúdo presente neste website, incluindo textos, imagens, logótipos e outros materiais, é propriedade da Paula Serrano Educação, Lda., salvo indicação em contrário. 
            A reprodução, distribuição ou qualquer outro uso do conteúdo sem autorização prévia por escrito é proibido.
          </p>
        </section>

        <section className="termos-section">
          <h2>3. Finalidade da Recolha de Dados</h2>
          <p>
            Todo o conteúdo presente neste website, incluindo textos, imagens, logótipos e outros materiais, é propriedade da Paula Serrano Educação, Lda., salvo indicação em contrário. 
            A reprodução, distribuição ou qualquer outro uso do conteúdo sem autorização prévia por escrito é proibido.
          </p>
        </section>

        <section className="termos-section">
          <h2>4. Limitação de Responsabilidade</h2>
          <p>
            A Paula Serrano Educação, Lda. envida todos os esforços para manter a informação neste website atualizada e precisa. 
            No entanto, não garante a exatidão, integridade ou atualidade das informações e não se responsabiliza por quaisquer danos resultantes do uso deste website.
          </p>
        </section>

        <section className="termos-section">
          <h2>5. Links para Terceiros</h2>
          <p>
            Este website pode conter links para websites de terceiros. A Paula Serrano Educação, Lda. não se responsabiliza pelo conteúdo ou práticas de privacidade desses websites.
          </p>
        </section>

        <section className="termos-section">
          <h2>6. Alterações aos Termos e Condições</h2>
          <p>
            A Paula Serrano Educação, Lda. reserva-se o direito de modificar estes Termos e Condições a qualquer momento. 
            As alterações entrarão em vigor após a sua publicação no website.
          </p>
        </section>

        <section className="termos-section">
          <h2>7. Lei Aplicável e Jurisdição</h2>
          <p>
            Estes Termos e Condições são regidos pela lei portuguesa. Qualquer litígio relacionado com este website será submetido à jurisdição exclusiva dos tribunais portugueses.
          </p>
        </section>

        <section className="termos-section">
          <h2>8. Contacto</h2>
          <p>
            Para qualquer questão relacionada com estes Termos e Condições, por favor contacte-nos através dos meios disponibilizados no nosso website.
          </p>
        </section>

        <footer className="termos-footer">
          <p>© 2025 Paula Serrano Educação, Lda. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
};

export default TermosCondicoes;