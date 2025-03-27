import React from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "../../styles/pages/mentorship.css";
import mentorshipImage from "../../assets/courses/PaulaSerrano-102 1.png";

const Mentorship = ({ id }: { id: string }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSaibaMaisClick = () => {
    navigate('/mentorship-details'); // Navigate to the MentorshipDetails page
  };

  return (
    <section id={id} className="mentorship">
      <div className="mentorship-container">
        <div className="mentorship-intro-tag">
          <span className="mentorship-tag">Mentoria</span>
          <p className="mentorship-intro">
            Descubra como a mentoria pode transformar sua carreira.
          </p>
        </div>

        <div className="mentorship-image">
          <img
            src={mentorshipImage}
            alt="Mentorship Session"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.src = "/default-image.png";
            }}
          />
        </div>

        <div className="mentorship-main-content">
          <h2>Mentoria Profissional: O Que é e Quais São as Suas Vantagens?</h2>
          <p>
            A mentoria profissional é um processo no qual um profissional mais
            experiente (mentor) orienta e apoia outro profissional menos
            experiente (mentorado) no desenvolvimento da sua carreira. Essa
            relação baseia-se na troca de experiências, conhecimentos e
            conselhos práticos, ajudando o mentorado a superar desafios e
            desenvolver competências.
          </p>
          <h3>Vantagens da Mentoria Profissional</h3>
          <ul>
            <li>Acesso a conhecimentos e experiências valiosos.</li>
            <li>Insights sobre boas práticas e estratégias eficazes.</li>
            <li>Desenvolvimento acelerado de competências.</li>
          </ul>
          <button
            className="mentorship-button"
            aria-label="Saiba mais sobre mentoria"
            onClick={handleSaibaMaisClick} // Use the new function
          >
            Saiba mais
          </button>
          <p className="mentorship-testimonial">
            
          </p>
        </div>
      </div>
    </section>
  );
};

export default Mentorship;