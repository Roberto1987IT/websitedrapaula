import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/pages/lancamentos.css";
import modulo1 from "../../assets/lancamentos/modulo1.jpg";
import modulo2 from "../../assets/courses/Brincar e terapia ocupacional - da teoria à prática.jpg";
import modulo3 from "../../assets/lancamentos/modulo3.jpg";
import modulo4 from "../../assets/courses/Integração Sensorial - avaliação e raciocinio clinico.jpg";

const lancamentos = [
  { image: modulo3, title: "Módulo 3: Brincar da teoria à prática em terapia ocupacional." },
  { image: modulo2, title: " Brincar e TO Teoria e Pratica." },
  { image: modulo1, title: "Módulo 1: Brincar da teoria à prática em terapia ocupacional." },
  { image: modulo4, title: "Integracao Sensorial: Avaliacao e Raciocínio Clinico." },
];

const Lancamentos = () => {
  const [loadedImages, setLoadedImages] = useState<number[]>([]);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => [...prev, index]);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsTextVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="lancamentos-section" id="lancamentos">
      <div className="lancamentos-container-main">
        <div className="lancamentos-header">
          <h2 className={`lancamentos-title ${isTextVisible ? "fade-in" : ""}`}>
            Destaques
          </h2>
          <p className={`lancamentos-subtitle ${isTextVisible ? "fade-in" : ""}`}>
            Conteúdo atualizado para transformar sua prática – descubra as novidades!
          </p>
        </div>

        <div className="lancamentos-grid">
          {lancamentos.map((lancamento, index) => (
            <div 
              key={index} 
              className="lancamento-item"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link to={`/lancamento/${index}`} className="lancamento-link">
                <div className={`lancamento-card ${hoveredIndex === index ? 'hovered' : ''}`}>
                  <div className="lancamento-image-wrapper">
                    <img
                      src={lancamento.image}
                      alt={lancamento.title}
                      className={`lancamento-image ${loadedImages.includes(index) ? "loaded" : ""}`}
                      onLoad={() => handleImageLoad(index)}
                      onError={(e) => {
                        console.error(`Failed to load image for: ${lancamento.title}`);
                        e.currentTarget.src = "https://via.placeholder.com/300x300?text=Imagem+Indisponível";
                      }}
                    />
                    <div className="lancamento-overlay">
                      <span className="lancamento-action">Ver detalhes</span>
                    </div>
                  </div>
                  <h3 className="lancamento-title">{lancamento.title}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Lancamentos;