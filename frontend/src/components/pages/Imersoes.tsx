import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/imersoes.css";
import imersao1 from "../../assets/imersoes/imersao1.jpg";
import imersao2 from "../../assets/imersoes/imersao2.jpg";
import imersao3 from "../../assets/imersoes/imersao3.jpg";

// Array of background images
const images = [imersao1, imersao2, imersao3];

// Update the component to accept an id prop with TypeScript typing
const Imersoes = ({ id }: { id: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Handle button click to navigate to ImersaoDetails page
  const handleSaberMaisClick = () => {
    navigate("/imersao-details");
  };

  return (
    // Add the id prop to the root section element
    <section
      id={id}
      className="imersoes"
      style={{ backgroundImage: `url(${images[currentIndex]})` }}
    >
      <div className="overlay">
        <div className="imersoes-content">
          <span className="imersoes-tag">Imersões</span>
          <h2>Aprenda na Prática!</h2>
          <p>
            Agende a sua imersão individual ou em grupo e desenvolva as suas
            competencias durante a experiência clínica.
          </p>
          <button className="imersoes-button" onClick={handleSaberMaisClick}>
            Saber Mais
          </button>
        </div>
      </div>
    </section>
  );
};

export default Imersoes;
