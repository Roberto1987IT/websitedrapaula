import React from "react";
import "../styles/Politica.css";

const Politica = () => {
  return (
    <div className="politica-wrapper">
      <div className="politica-container">
        <header className="politica-header">
          <h1>Política de Privacidade</h1>
          <p className="company-name"><strong>Paula Serrano Educação</strong></p>
          <p className="update-date"><em>Última atualização: 02/04/2025</em></p>
        </header>

        <section className="politica-section">
          <h2>1. Introdução</h2>
          <p>
            A Paula Serrano Educação, Lda. compromete-se a proteger a privacidade e os dados pessoais dos seus utilizadores. 
            Esta Política de Privacidade explica como recolhemos, utilizamos e protegemos as informações fornecidas pelos visitantes do nosso website.
          </p>
        </section>

        <section className="politica-section">
          <h2>2. Dados Recolhidos</h2>
          <p>Podemos recolher os seguintes dados pessoais:</p>
          <ul>
            <li>Nome e endereço de e-mail (quando fornecidos pelo utilizador através de formulários de contacto ou inscrição).</li>
            <li>Informações fornecidas voluntariamente em interações no website.</li>
            <li>
              Dados de navegação, como endereço IP, tipo de dispositivo e comportamento no site, para fins estatísticos e de melhoria da experiência do utilizador.
            </li>
          </ul>
        </section>

        <section className="politica-section">
          <h2>3. Finalidade da Recolha de Dados</h2>
          <p>Os dados recolhidos serão utilizados para:</p>
          <ul>
            <li>Responder a pedidos de informação e contacto.</li>
            <li>Enviar comunicações relacionadas com serviços, cursos e eventos (caso o utilizador tenha dado consentimento).</li>
            <li>Melhorar a navegação e o funcionamento do website.</li>
            <li>Cumprimento de obrigações legais.</li>
          </ul>
        </section>

        <section className="politica-section">
          <h2>4. Contacto</h2>
          <p>
            Para mais informações sobre a nossa Política de Privacidade ou para exercer os seus direitos, entre em contacto connosco através do e-mail:
          </p>
          <p className="email-contact"><a href="paulaserranoeducacao@gmail.com">paulaserranoeducacao@gmail.com</a></p>
        </section>

        <section className="politica-section">
          <h2>5. Segurança dos Dados</h2>
          <p>
            Implementamos medidas de segurança técnicas e organizacionais para proteger os dados pessoais contra acessos não autorizados, perdas ou alterações.
          </p>
        </section>

        <section className="politica-section">
          <h2>6. Direitos do Utilizador</h2>
          <p>Os utilizadores têm o direito de:</p>
          <ul>
            <li>Aceder, corrigir ou eliminar os seus dados pessoais.</li>
            <li>Retirar o consentimento para o tratamento dos dados, quando aplicável.</li>
            <li>Solicitar a portabilidade dos dados.</li>
            <li>Apresentar reclamação junto da Comissão Nacional de Proteção de Dados (CNPD).</li>
          </ul>
        </section>

        <section className="politica-section">
          <h2>7. Cookies e Tecnologias de Rastreamento</h2>
          <p>
            O website pode utilizar cookies para melhorar a experiência do utilizador. O utilizador pode configurar o seu navegador para recusar cookies, 
            embora isso possa afetar a navegação no site.
          </p>
        </section>

        <section className="politica-section">
          <h2>8. Alterações à Política de Privacidade</h2>
          <p>
            A Paula Serrano Educação, Lda. pode atualizar esta Política de Privacidade a qualquer momento. Quaisquer alterações serão publicadas no website 
            e entrarão em vigor imediatamente.
          </p>
        </section>

        <section className="politica-section">
          <h2>9. Contacto</h2>
          <p>
            Para mais informações sobre a nossa Política de Privacidade ou para exercer os seus direitos, entre em contacto connosco através dos meios 
            disponibilizados no website.
          </p>
        </section>

        <footer className="politica-footer">
          <p>© 2025 Paula Serrano Educação, Lda. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
};

export default Politica;