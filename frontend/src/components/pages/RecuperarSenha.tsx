import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/pages/recuperar-senha.css";

const RecuperarSenha = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert("Se este email estiver registado, um link para redefinir a senha será enviado.");
      setIsSubmitting(false);
      setEmail("");
    }, 1500);
  };

  return (
    <div className="recovery-page">
      <div className="recovery-container">
        <div className="recovery-card">
          <div className="recovery-header">
            <h2>Recuperar Palavra-Passe</h2>
            <p>Digite seu email e enviaremos um link para redefinir sua senha.</p>
          </div>

          <form onSubmit={handleSubmit} className="recovery-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Insira o seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="recovery-input"
              />
            </div>

            <button 
              type="submit" 
              className={`recovery-button ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Recuperar Palavra-Passe'}
            </button>
          </form>

          <div className="recovery-footer">
            <Link to="/login" className="back-link">
              <span className="back-arrow">←</span> Voltar ao login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecuperarSenha;
