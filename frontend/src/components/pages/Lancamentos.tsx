import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import "../../styles/pages/carousel.css";
import modulo1 from "../../assets/galleryPse/img6.jpeg";
import modulo2 from "../../assets/courses/curso4.jpg";
import modulo3 from "../../assets/courses/curso2.jpg";
import modulo4 from "../../assets/courses/curso3.jpg";
import modulo5 from "../../assets/courses/curso1.jpg";
import modulo6 from "../../assets/galleryPse/img2.jpeg";
import modulo7 from "../../assets/courses/curso5.jpg";
import modulo8 from "../../assets/courses/curso3.jpg";
import ImageModal from "../../components/ImageModal";

const lancamentos = [
  { image: modulo3, title: "Sala de Formacoes." },
  { image: modulo2, title: "Aulas de Grupo" },
  { image: modulo1, title: "Salas para teoria à prática em terapia ocupacional." },
  { image: modulo4, title: "Formacoes exclusivas." },
  { image: modulo5, title: "Aulas praticas." },
  { image: modulo6, title: "Avaliacao e Raciocínio Clinico." },
  { image: modulo7, title: "Ativadades Individuais e em grupo." },
  { image: modulo8, title: "Salas para ensino" },
];

const Lancamentos = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [animationDirection, setAnimationDirection] = useState("next");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  // New state for modal image viewing
  const [modalImage, setModalImage] = useState<null | { image: string; title: string }>(null);
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);
  const transitionTimeoutRef = useRef<number | null>(null);
  
  const visibleSlides = screenWidth > 1024 ? 3 : screenWidth > 768 ? 2 : 1;
  const maxIndex = lancamentos.length - visibleSlides;

  // Set initial text visibility with a staggered animation
  useEffect(() => {
    setIsTextVisible(true);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      const newVisibleSlides = window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1;
      if (activeIndex > lancamentos.length - newVisibleSlides) {
        setActiveIndex(Math.max(0, lancamentos.length - newVisibleSlides));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeIndex, lancamentos.length]);

  // Auto-slide functionality
  useEffect(() => {
    const startAutoSlide = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      
      intervalRef.current = window.setInterval(() => {
        if (!isPaused && !isTransitioning) {
          goToNextSlide();
        }
      }, 5000);
    };

    startAutoSlide();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, isTransitioning]);

  // Clean up transition timeout on unmount
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    };
  }, []);

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    
    setAnimationDirection(index > activeIndex ? "next" : "prev");
    setIsTransitioning(true);
    setActiveIndex(index);
    
    transitionTimeoutRef.current = window.setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const goToPrevSlide = () => {
    if (isTransitioning) return;
    
    setAnimationDirection("prev");
    setIsTransitioning(true);
    setActiveIndex(prevIndex => {
      const newIndex = prevIndex - 1;
      return newIndex < 0 ? maxIndex : newIndex;
    });
    
    transitionTimeoutRef.current = window.setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  const goToNextSlide = () => {
    if (isTransitioning) return;
    
    setAnimationDirection("next");
    setIsTransitioning(true);
    setActiveIndex(prevIndex => {
      const newIndex = prevIndex + 1;
      return newIndex > maxIndex ? 0 : newIndex;
    });
    
    transitionTimeoutRef.current = window.setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  // Touch event handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    const touchDiff = touchStart - touchEnd;
    
    if (touchDiff > 75) {
      // Swipe left
      goToNextSlide();
    } else if (touchDiff < -75) {
      // Swipe right
      goToPrevSlide();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevSlide();
      } else if (e.key === "ArrowRight") {
        goToNextSlide();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isTransitioning]);

  // Open image in modal
  const openImageModal = (lancamento: typeof lancamentos[0]) => {
    setModalImage(lancamento);
    setIsPaused(true); // Pause the carousel when viewing an image
  };

  // Close the image modal
  const closeImageModal = () => {
    setModalImage(null);
    setIsPaused(false); // Resume the carousel
  };

  return (
    <section className="carousel-section" id="lancamentos" aria-label="Destaques de cursos">
      <div className="carousel-container">
        <div className="carousel-header">
          <h2 className={`carousel-title ${isTextVisible ? "fade-in" : ""}`}>
            Galeria de Imagens 
          </h2>
          <div className="carousel-subtitle-container">
            <p className={`carousel-subtitle ${isTextVisible ? "fade-in" : ""}`}>
            Cada imagem conta parte da nossa jornada!
            </p>
          </div>
        </div>

        <div 
          className="carousel-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          ref={carouselRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Destaques de cursos disponíveis"
        >
          <button 
            className="carousel-arrow carousel-prev" 
            onClick={goToPrevSlide}
            aria-label="Slide anterior"
            disabled={isTransitioning}
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="carousel-slides-container">
            <div 
              className={`carousel-slides carousel-direction-${animationDirection} ${isTransitioning ? 'transitioning' : ''}`}
              style={{ 
                transform: `translateX(-${activeIndex * (100 / visibleSlides)}%)`,
              }}
              aria-live="polite"
            >
              {lancamentos.map((lancamento, index) => (
                <div 
                  key={index} 
                  className={`carousel-slide ${
                    index >= activeIndex && index < activeIndex + visibleSlides ? "active" : ""
                  }`}
                  style={{ width: `${100 / visibleSlides}%` }}
                  aria-hidden={!(index >= activeIndex && index < activeIndex + visibleSlides)}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} de ${lancamentos.length}: ${lancamento.title}`}
                >
                  <div className="carousel-slide-content">
                    <div className="carousel-image-wrapper">
                      <img
                        src={lancamento.image}
                        alt={lancamento.title}
                        className="carousel-image"
                        loading={index < activeIndex + visibleSlides * 2 ? "eager" : "lazy"}
                        onClick={() => openImageModal(lancamento)}
                        onError={(e) => {
                          console.error(`Failed to load image for: ${lancamento.title}`);
                          e.currentTarget.src = "https://via.placeholder.com/300x300?text=Imagem+Indisponível";
                        }}
                      />
                      <div className="carousel-overlay">
                        <button 
                          className="carousel-expand-button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            openImageModal(lancamento);
                          }}
                          aria-label={`Expandir imagem: ${lancamento.title}`}
                        >
                          <Maximize2 size={20} />
                        </button>
                        <span className="carousel-action" onClick={() => openImageModal(lancamento)}>Ampliar imagem</span>
                      </div>
                    </div>
                    <div className="carousel-content">
                      <h3 className="carousel-slide-title">{lancamento.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            className="carousel-arrow carousel-next" 
            onClick={goToNextSlide}
            aria-label="Próximo slide"
            disabled={isTransitioning}
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        <div className="carousel-controls">
          <div className="carousel-indicators" role="tablist">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                className={`carousel-indicator ${index === activeIndex ? "active" : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Ir para slide ${index + 1}`}
                aria-selected={index === activeIndex}
                role="tab"
              />
            ))}
          </div>

          <div className="carousel-progress-container">
            <div className="carousel-progress-bar">
              <div 
                className="carousel-progress" 
                style={{ 
                  width: `${((activeIndex) / (maxIndex)) * 100}%`,
                  animationPlayState: isPaused ? 'paused' : 'running' 
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal for expanded view */}
      {modalImage && (
        <ImageModal
          image={modalImage.image}
          title={modalImage.title}
          isOpen={!!modalImage}
          onClose={closeImageModal}
        />
      )}
    </section>
  );
};

export default Lancamentos;
