import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface ImageModalProps {
  image: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal = ({ image, title, isOpen, onClose }: ImageModalProps) => {
  const [animateIn, setAnimateIn] = useState(false);

  // Handle escape key press to close modal
  useEffect(() => {
    if (!isOpen) return;
    
    setAnimateIn(true);
    
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    document.addEventListener("keydown", handleEscKey);
    // Prevent scrolling on body when modal is open
    document.body.style.overflow = "hidden";
    
    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleClose = () => {
    setAnimateIn(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`image-modal-overlay ${animateIn ? 'modal-visible' : 'modal-hiding'}`}
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
      aria-label={`Visualização ampliada de ${title}`}
    >
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        <button 
          className="image-modal-close" 
          onClick={handleClose}
          aria-label="Fechar imagem"
        >
          <X size={24} />
        </button>
        <div className="image-modal-image-container">
          <img 
            src={image} 
            alt={title} 
            className="image-modal-image"
          />
        </div>
        <div className="image-modal-title">
          <h3>{title}</h3>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;