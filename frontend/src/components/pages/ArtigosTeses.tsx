import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Download } from "lucide-react";
import "../../styles/pages/artigosTeses.css";

interface Article {
  id: number;
  title: string;
  author: string;
  type: "artigo" | "tese";
  date: string;
  description: string;
  file: string;
}

// Sample articles data - using simplified filenames
const sampleArticles: Article[] = [
  {
    id: 1,
    title: "O brincar e o processamento sensorial em criancas dos 36 aos 72 meses",
    author: "Margarida Isabel Dias Ribeiro Sabino Cardoso",
    type: "artigo",
    date: "12/07/2024",
    description: "Brincar é a principal ocupação nos primeiros anos de vida da criança...",
    file: "pdfs/o-brincar-e-o-processamento-sensorial.pdf", // Updated file path
  },
  {
    id: 2,
    title: "Adaptação cultural e linguística e recolha dos dados normativos das Structured Observations of Sensory Related Motor Performance",
    author: "Paula de Jesus Mendes Serrano",
    type: "artigo",
    date: "03/01/2013",
    description: "Desde o início do desenvolvimento da teoria de integração sensorial...",
    file: "pdfs/adaptacao-cultural-linguistica.pdf", // Updated file path
  },
  {
    id: 3,
    title: "Comportamentos do brincar com o corpo, de bebes entre os 10 e os 12 meses",
    author: "Ana Margarida Almeida Reis",
    type: "artigo",
    date: "22/02/2023",
    description: "Introdução: Ao brincar a criança dá significado ao mundo que a rodeia...",
    file: "pdfs/comportamentos-brincar-corpo.pdf", // Updated file path
  },
];

const ArtigosTeses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("todos");
  const [isLoading, setIsLoading] = useState(false); // Changed to false since we're using local data
  const [allArticles] = useState<Article[]>(sampleArticles); // Directly use sample data
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(sampleArticles);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  useEffect(() => {
    // Filter articles based on search and filter criteria
    const filtered = allArticles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.author.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter = activeFilter === "todos" || article.type === activeFilter;

      return matchesSearch && matchesFilter;
    });

    setFilteredArticles(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, activeFilter, allArticles]);

  const handleFilterClick = (filter: "todos" | "artigo" | "tese") => {
    setActiveFilter(filter);
  };

  const handleDownload = async (article: Article) => {
    console.log("Download button clicked for:", article.title); // Debugging log

    if (!article.file) {
      toast.error(`Arquivo não disponível para "${article.title}"`);
      return;
    }

    try {
      // Use a relative path for the file URL
      const fileUrl = `/${article.file}`;
      console.log("Generated file URL:", fileUrl); // Debugging log

      // Fetch the file content
      const response = await fetch(fileUrl);
      console.log("Fetch response status:", response.status); // Debugging log
      if (!response.ok) {
        throw new Error("File not found");
      }

      // Convert the response to a Blob and explicitly set the MIME type
      const blob = await response.blob();
      const pdfBlob = new Blob([blob], { type: "application/pdf" });
      const blobUrl = window.URL.createObjectURL(pdfBlob);

      // Create and trigger the download link
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${article.title.replace(/[^\w]/g, "_")}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Revoke the Blob URL after download
      window.URL.revokeObjectURL(blobUrl);

      toast.success(`Download de "${article.title}" iniciado`);
    } catch (error) {
      console.error("Download error:", error); // Debugging log
      toast.error(`Falha ao baixar "${article.title}"`);
    }
  };

  // Pagination calculations
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const getPaginationNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 2) {
        endPage = 3;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 2;
      }

      if (startPage > 2) {
        pages.push(-1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push(-2);
      }

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
                <p className="publication-description">
                  {article.description}
                </p>
              </div>
              <div className="publication-actions">
                <button
                  className="publication-download-button"
                  onClick={() => handleDownload(article)}
                  aria-label={`Baixar ${article.title}`}
                >
                  <Download size={18} className="download-icon" />
                  <span>Download PDF</span>
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

      {filteredArticles.length > articlesPerPage && (
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