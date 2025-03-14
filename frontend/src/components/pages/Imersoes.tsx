import React, { useState, useEffect } from "react";
import "../../styles/pages/imersoes.css"; // Import updated CSS
import imersao1 from "../../assets/imersoes/imersao1.jpg";
import imersao2 from "../../assets/imersoes/imersao2.jpg";
import imersao3 from "../../assets/imersoes/imersao3.jpg";

const images = [imersao1, imersao2, imersao3]; // Array of background images

const Imersoes = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <section
      className="imersoes"
      style={{ backgroundImage: `url(${images[currentIndex]})` }}
    >
      <div className="overlay">
        <div className="imersoes-content">
          <span className="imersoes-tag">Imersões</span>
          <h2>Aprenda na Prática!</h2>
          <p>
            Agende a sua imersão individual ou em grupo e aprimore as suas
            habilidades com experiência clínica.
          </p>
          <button className="imersoes-button" onClick={() => alert("Clicked!")}>
            Saber Mais
          </button>
        </div>
      </div>
    </section>
  );
};

export default Imersoes;