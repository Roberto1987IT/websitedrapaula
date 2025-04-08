import React from "react";
import "../styles/politicaCookies.css";

const PoliticaCookies = () => {
  return (
    <div className="politica-cookies-wrapper">
      <div className="politica-cookies-container">
        <header className="politica-cookies-header">
          <h1>Política de Cookies</h1>
          <p className="company-name"><strong>Paula Serrano Educação</strong></p>
          <p className="update-date"><em>Última atualização: 02/04/2025</em></p>
        </header>

        <section className="politica-cookies-section">
          <h2>1. O que são Cookies?</h2>
          <p>
            Cookies são pequenos ficheiros de texto armazenados no seu dispositivo (computador, tablet ou telemóvel) quando visita um website. 
            Estes ficheiros permitem reconhecer o seu dispositivo e armazenar algumas informações sobre as suas preferências ou ações anteriores.
          </p>
        </section>

        <section className="politica-cookies-section">
          <h2>2. Para que utilizamos Cookies?</h2>
          <p>No site da Paula Serrano Educação, os cookies são utilizados para:</p>
          <ul>
            <li>Melhorar a experiência de navegação do utilizador.</li>
            <li>Garantir o funcionamento eficiente e seguro do website.</li>
            <li>Analisar o tráfego e o comportamento de navegação, de forma a otimizar os conteúdos e funcionalidades.</li>
            <li>Memorizar as preferências do utilizador em visitas futuras.</li>
          </ul>
        </section>

        <section className="politica-cookies-section">
          <h2>3. Tipos de Cookies Utilizados</h2>
          <p>O nosso website pode utilizar os seguintes tipos de cookies:</p>
          <ul>
            <li>
              <strong>Cookies Essenciais:</strong> Necessários para o funcionamento do site. Sem estes cookies, alguns serviços não podem ser prestados.
            </li>
            <li>
              <strong>Cookies de Desempenho:</strong> Recolhem informações sobre como os visitantes utilizam o site (por exemplo, páginas mais visitadas). 
              Estes dados são anónimos e usados apenas para melhorar o funcionamento do site.
            </li>
            <li>
              <strong>Cookies Funcionais:</strong> Permitem lembrar preferências do utilizador (como idioma ou região) e proporcionar uma experiência mais personalizada.
            </li>
            <li>
              <strong>Cookies de Terceiros:</strong> Podem ser utilizados serviços externos como o Google Analytics para análise de tráfego. 
              Estes cookies são geridos por terceiros e seguem as suas próprias políticas de privacidade.
            </li>
          </ul>
        </section>

        <section className="politica-cookies-section">
          <h2>4. Gestão de Cookies</h2>
          <p>
            Ao aceder ao nosso website pela primeira vez, será apresentado um aviso com a opção de aceitar ou configurar os cookies. 
            O utilizador pode, a qualquer momento, alterar as configurações de cookies no seu navegador, ativando ou desativando alguns ou todos os cookies.
            Tenha em atenção que a desativação de cookies essenciais pode afetar o funcionamento do site.
          </p>
        </section>

        <section className="politica-cookies-section">
          <h2>5. Alterações à Política de Cookies</h2>
          <p>
            A Paula Serrano Educação poderá atualizar esta política periodicamente. Recomendamos que consulte esta página regularmente para se manter informado sobre qualquer alteração.
          </p>
        </section>

        <section className="politica-cookies-section">
          <h2>6. Contacto</h2>
          <p>
            Se tiver dúvidas sobre esta Política de Cookies ou sobre o tratamento dos seus dados, entre em contacto connosco através dos canais disponíveis no website.
          </p>
        </section>

        <footer className="politica-cookies-footer">
          <p>© 2025 Paula Serrano Educação, Lda. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
};

export default PoliticaCookies;
