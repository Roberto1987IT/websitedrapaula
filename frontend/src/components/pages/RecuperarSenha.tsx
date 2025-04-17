import { useState } from "react";
import { Link } from "react-router-dom";
import config from "@/config";
import "../../styles/pages/recuperar-senha.css";

const RecuperarSenha = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: "", type: "" });
    
    try {
      const response = await fetch(`${config.backendUrl}/api/auth/password-reset/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      // Even if the email doesn't exist, we should show the same message for security reasons
      setMessage({
        text: "Se este email estiver registado, um link para redefinir a senha será enviado.",
        type: "success"
      });
      setEmail("");
      
    } catch (error) {
      console.error("Password reset request error:", error);
      setMessage({
        text: "Ocorreu um erro ao processar seu pedido. Por favor, tente novamente mais tarde.",
        type: "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="recovery-page">
      <div className="recovery-container">
        <div className="recovery-card">
          <div className="recovery-header">
            <h2>Recuperar Palavra-Passe</h2>
            <p>Digite seu email e enviaremos um link para redefinir sua senha.</p>
          </div>

          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

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
                disabled={isSubmitting}
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