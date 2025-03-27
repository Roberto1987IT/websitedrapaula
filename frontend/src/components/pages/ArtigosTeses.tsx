import React, { useState, useEffect } from "react";
import "../../styles/pages/artigosTeses.css";
import axios from "axios";
import { toast } from "sonner";

interface Article {
  id: number;
  title: string;
  author: string;
  type: "artigo" | "tese";
  date: string;
  description: string;
  file: string;
}

// Sample articles data for development/testing
const sampleArticles: Article[] = [
  {
    id: 1,
    title: "O brincar e o processamento sensorial em criancas dos 36 aos 72 meses",
    author: "Margarida Isabel Dias Ribeiro Sabino Cardoso",
    type: "artigo",
    date: "12/07/2024",
    description: "Brincar é a principal ocupação nos primeiros anos de vida da criança, existindo um papel central do processamento sensorial no desenvolvimento do brincar (Parham & Fazio, 2008). Neste sentido, importa perceber a relação que existe entre o processamento sensorial da criança e as competências do brincar.",
    file: "Projeto Final_Brincar e Processamento Sensorial dos 36 aos 72 meses_julho_Margarida Cardoso.pdf",
  },
  {
    id: 2,
    title: "Adaptação cultural e linguística e recolha dos dados normativos das Structured Observations of Sensory Related Motor Performance",
    author: "Paula de Jesus Mendes Serrano",
    type: "artigo",
    date: "03/01/2013",
    description: "Desde o início do desenvolvimento da teoria de integração sensorial por Jean Ayres que são  utilizadas  Observações  Clinicas  (OC)  em  complemento  aos  testes  estandardizados  e  por  vezes como única forma de avaliação. O principal objectivo das OC é permitir ao terapeuta utilizar o seu raciocínio clínico, com base na teoria e na investigação, para analisar o desempenho da criança em relação  ao  processamento  sensorial. ",
    file: "Adaptação cultural e linguística e recolha dos dados.pdf",
  },
  {
    id: 3,
    title: "Comportamentos do brincar com o corpo, de bebes entre os 10 e os 12 meses",
    author: "Ana Margarida Almeida Reis",
    type: "artigo",
    date: "22/02/2023",
    description: "Introdução:  Ao  brincar  a  criança  dá  significado  ao  mundo  que  a  rodeia,  expressa-se  e estabelece relacionamentos com os outros.  Objetivos:  Construir  e  validar  uma  grelha  de  avaliação  dos  comportamentos  do  brincar com o corpo de bebés e relacionar os resultados obtidos com o seu perfil sensorial.",
    file: "comportamentos do brincar com o corpo, de bebés entre os 10 e os 12 (1).pdf",
  },
  {
    id: 4,
    title: "Screening Assessment of Sensory Integration (SASI) - Research Ed. V.2.2: Análise da capacidade discriminativa do teste de estereognosia de crianças portuguesas entre os 4 e 7 anos e 11 meses",
    author: "Ana Margarida Almeida Reis",
    type: "tese",
    date: "15/02/2023",
    description: "Avaliar a capacidade discriminativa do teste de estereognosia do SASI: comparação da prova com e sem alterações.",
    file: "Projeto Final_Brincar e Processamento Sensorial dos 36 aos 72 meses_julho_Margarida Cardoso (2).pdf",
  },
  {
    id: 5,
    title: "Intervenção Precoce em Crianças com Transtorno do Espectro Autista",
    author: "Carolina Santos Oliveira",
    type: "artigo",
    date: "05/05/2024",
    description: "Este artigo explora as abordagens de intervenção precoce em crianças com TEA e seus resultados no desenvolvimento motor e cognitivo. A análise contempla os métodos mais eficazes baseados em evidências científicas atuais.",
    file: "Projeto Final_Brincar e Processamento Sensorial dos 36 aos 72 meses_julho_Margarida Cardoso (2).pdf",
  },
  {
    id: 6,
    title: "A Influência da Terapia Ocupacional na Reabilitação Pós-AVC: Um Estudo Longitudinal",
    author: "Rafael Costa Mendes",
    type: "tese",
    date: "18/03/2024",
    description: "Esta tese apresenta um estudo longitudinal de cinco anos sobre a eficácia da terapia ocupacional na recuperação funcional de pacientes pós-AVC, destacando a importância da intervenção precoce e continuada.",
    file: "Projeto Final_Brincar e Processamento Sensorial dos 36 aos 72 meses_julho_Margarida Cardoso (2).pdf",
  },
  {
    id: 7,
    title: "Tecnologias Assistivas para Pessoas com Deficiência Visual: Avanços Recentes",
    author: "Beatriz Ferreira Lima",
    type: "artigo",
    date: "30/01/2024",
    description: "Este artigo analisa os avanços recentes em tecnologias assistivas para pessoas com deficiência visual, abordando desde dispositivos hápticos até softwares de reconhecimento de imagem, e seu impacto na qualidade de vida dos usuários.",
    file: "Projeto Final_Brincar e Processamento Sensorial dos 36 aos 72 meses_julho_Margarida Cardoso (2).pdf",
  },
  {
    id: 8,
    title: "Integração Sensorial em Adultos com TDAH: Desafios e Estratégias",
    author: "Diogo Alves Pereira",
    type: "tese",
    date: "12/11/2023",
    description: "Esta tese investiga os desafios de integração sensorial enfrentados por adultos com TDAH e propõe um conjunto de estratégias terapêuticas baseadas em evidências para melhorar seu funcionamento cotidiano.",
    file: "Projeto Final_Brincar e Processamento Sensorial dos 36 aos 72 meses_julho_Margarida Cardoso (2).pdf",
  },
  {
    id: 9,
    title: "O Papel da Terapia Ocupacional na Reabilitação de Mão Pós-Trauma",
    author: "Mariana Silva Rodrigues",
    type: "artigo",
    date: "25/09/2023",
    description: "Este artigo discute as técnicas e protocolos atuais de terapia ocupacional na reabilitação de mão após traumas, incluindo fraturas, lesões nervosas e tendinosas, com foco na recuperação funcional.",
    file: "Projeto Final_Brincar e Processamento Sensorial dos 36 aos 72 meses_julho_Margarida Cardoso (2).pdf",
  },
  {
    id: 10,
    title: "Modelos de Intervenção em Terapia Ocupacional para Idosos com Demência",
    author: "Pedro Henrique Nunes",
    type: "tese",
    date: "08/08/2023",
    description: "Esta tese analisa comparativamente diferentes modelos de intervenção em terapia ocupacional para idosos com demência, avaliando sua eficácia na manutenção da autonomia e na melhoria da qualidade de vida.",
    file: "Projeto Final_Brincar e Processamento Sensorial dos 36 aos 72 meses_julho_Margarida Cardoso (2).pdf",
  },
  {
    id: 11,
    title: "Intervenção Domiciliar em Terapia Ocupacional: Desafios e Benefícios",
    author: "Sofia Martins Costa",
    type: "artigo",
    date: "14/06/2023",
    description: "Este artigo examina os desafios e benefícios da intervenção domiciliar em terapia ocupacional, destacando sua importância no contexto real do paciente e na promoção de sua autonomia.",
    file: "Projeto Final_Brincar e Processamento Sensorial dos 36 aos 72 meses_julho_Margarida Cardoso (2).pdf",
  },
  {
    id: 12,
    title: "Adaptações Ambientais para Pessoas com Mobilidade Reduzida: Um Guia Prático",
    author: "Lucas Oliveira Santos",
    type: "tese",
    date: "03/04/2023",
    description: "Esta tese apresenta um guia prático e evidências científicas para adaptações ambientais destinadas a pessoas com mobilidade reduzida, abrangendo espaços residenciais, de trabalho e públicos.",
    file: "Projeto Final_Brincar e Processamento Sensorial dos 36 aos 72 meses_julho_Margarida Cardoso (2).pdf",
  },
];

const ArtigosTeses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("todos");
  const [isLoading, setIsLoading] = useState(true);
  const [allArticles, setAllArticles] = useState<Article[]>([]); // All articles from API
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]); // Filtered articles
  const [expandedArticles, setExpandedArticles] = useState<Record<number, boolean>>({});
  const [useLocalData, setUseLocalData] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/documents/");
        console.log("Fetched articles:", response.data); // Debug API response
        setAllArticles(response.data);
        setFilteredArticles(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        // If API fails, use sample data
        setUseLocalData(true);
        setAllArticles(sampleArticles);
        setFilteredArticles(sampleArticles);
        setIsLoading(false);
        toast.error("Não foi possível conectar ao servidor. Usando dados de exemplo para demonstração.");
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    const filtered = allArticles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.author.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter = activeFilter === "todos" || article.type === activeFilter;

      return matchesSearch && matchesFilter;
    });

    setFilteredArticles(filtered);
    setCurrentPage(1); // Reset to first page whenever filters change
  }, [searchTerm, activeFilter, allArticles]);

  const handleFilterClick = (filter: "todos" | "artigo" | "tese"): void => {
    setActiveFilter(filter);
  };

  const handleDownload = (article: Article): void => {
    // Check if the file URL exists
    if (!article.file) {
      toast.error(`Arquivo não disponível para "${article.title}"`);
      return;
    }

    try {
      // Create a file path based on whether we're using local data or API data
      let fileUrl;

      if (useLocalData) {
        // For sample data during development, use the local public folder
        fileUrl = `/pdfs/${article.file}`;
      } else {
        // For real backend data, use the appropriate path
        // Extract just the filename from the full path (if any)
        const fileName = article.file.split('/').pop();
        fileUrl = `/pdfs/${fileName}`;
      }

      // Log the file URL for debugging
      console.log(`Attempting to download file from: ${fileUrl}`);

      // Create a temporary anchor element to trigger the download
      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute("download", `${article.title.replace(/\s+/g, "_")}.pdf`);
      
      // For some browsers that require the link to be in the DOM
      document.body.appendChild(link);
      
      // Trigger the download
      link.click();
      
      // Clean up
      document.body.removeChild(link);

      toast.success(`Download de "${article.title}" iniciado`);
    } catch (error) {
      console.error("Download error:", error);
      toast.error(`Erro ao baixar "${article.title}"`);
    }
  };

  const toggleExpandArticle = (articleId: number) => {
    setExpandedArticles((prev) => ({
      ...prev,
      [articleId]: !prev[articleId],
    }));
  };

  // Calculate pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Generate pagination numbers
  const getPaginationNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if there are fewer than maxPagesToShow
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate middle pages to show
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we're at the beginning or end
      if (currentPage <= 2) {
        endPage = 3;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 2;
      }
      
      // Show ellipsis if needed before middle pages
      if (startPage > 2) {
        pages.push(-1); // -1 represents ellipsis
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Show ellipsis if needed after middle pages
      if (endPage < totalPages - 1) {
        pages.push(-2); // -2 represents ellipsis
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="artigos-teses-container">
      <div className="artigos-teses-hero">
        <h1 className="artigos-teses-title">Artigos e Teses Acadêmicas</h1>
        <p className="artigos-teses-subtitle">
          Conhecimento científico em Terapia Ocupacional para profissionais e estudantes
        </p>
      </div>

      <div className="search-filter-section">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Pesquisar por título, autor ou conteúdo..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-buttons">
          <button
            className={`filter-button ${activeFilter === "todos" ? "active" : ""}`}
            onClick={() => handleFilterClick("todos")}
          >
            <span className="filter-icon">📋</span>
            Todos
          </button>
          <button
            className={`filter-button ${activeFilter === "artigo" ? "active" : ""}`}
            onClick={() => handleFilterClick("artigo")}
          >
            <span className="filter-icon">📄</span>
            Artigos
          </button>
          <button
            className={`filter-button ${activeFilter === "tese" ? "active" : ""}`}
            onClick={() => handleFilterClick("tese")}
          >
            <span className="filter-icon">📚</span>
            Teses
          </button>
        </div>
      </div>

      <div className="publications-stats">
        <p>Mostrando {currentArticles.length} de {filteredArticles.length} publicações</p>
      </div>

      {isLoading ? (
        <div className="artigos-teses-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="publication-card skeleton-card">
              <div className="skeleton-title"></div>
              <div className="skeleton-meta"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-button"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="artigos-teses-grid">
          {currentArticles.length > 0 ? (
            currentArticles.map((article) => (
              <div key={article.id} className="publication-card">
                <div className="publication-header">
                  <div className="publication-type">
                    <span className="publication-icon">
                      {article.type === "artigo" ? "📄" : "📚"}
                    </span>
                    <span>{article.type === "artigo" ? "Artigo" : "Tese"}</span>
                  </div>
                  <h2 className="publication-title">{article.title}</h2>
                  <div className="publication-meta">
                    <span className="publication-author">Por {article.author}</span>
                    <span className="publication-date">{article.date}</span>
                  </div>
                </div>
                <div className="publication-content">
                  <p
                    className={`publication-description ${
                      expandedArticles[article.id] ? "expanded" : ""
                    }`}
                  >
                    {article.description}
                  </p>
                </div>
                <div className="publication-actions">
                  <button
                    className="publication-read-button"
                    onClick={() => toggleExpandArticle(article.id)}
                    aria-label={
                      expandedArticles[article.id]
                        ? `Recolher ${article.title}`
                        : `Ler ${article.title}`
                    }
                  >
                    {expandedArticles[article.id] ? "Recolher" : "Ler Mais"}
                  </button>
                  <button
                    className="publication-download-button"
                    onClick={() => handleDownload(article)}
                    aria-label={`Baixar ${article.title}`}
                  >
                    📥
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>Nenhuma publicação encontrada com os critérios selecionados.</p>
              <button
                className="reset-button"
                onClick={() => {
                  setSearchTerm("");
                  setActiveFilter("todos");
                }}
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      )}

      {/* Pagination controls */}
      {!isLoading && filteredArticles.length > articlesPerPage && (
        <div className="pagination-controls">
          <button
            className="pagination-button"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Página anterior"
          >
            ←
          </button>
          
          {getPaginationNumbers().map((number, index) => (
            number < 0 ? (
              <span key={index} className="pagination-ellipsis">...</span>
            ) : (
              <button
                key={index}
                className={`pagination-button ${currentPage === number ? "active" : ""}`}
                onClick={() => paginate(number)}
                aria-label={`Página ${number}`}
                aria-current={currentPage === number ? "page" : undefined}
              >
                {number}
              </button>
            )
          ))}
          
          <button
            className="pagination-button"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Próxima página"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default ArtigosTeses;
