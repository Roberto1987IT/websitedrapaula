import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import config from "@/config";
import "../../styles/pages/reset-password.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [tokenValid, setTokenValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { uid, token } = useParams();

  useEffect(() => {
    // Verify token validity
    const verifyToken = async () => {
      try {
        const response = await fetch(`${config.backendUrl}/api/auth/password-reset/validate-token/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uid, token }),
        });

        if (response.ok) {
          setTokenValid(true);
        } else {
          setMessage({
            text: "Este link de redefinição de senha é inválido ou expirou.",
            type: "error"
          });
          setTokenValid(false);
        }
      } catch (error) {
        console.error("Token validation error:", error);
        setMessage({
          text: "Ocorreu um erro ao validar o link. Por favor, tente novamente mais tarde.",
          type: "error"
        });
        setTokenValid(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [uid, token]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords
    if (password !== confirmPassword) {
      setMessage({
        text: "As senhas não coincidem.",
        type: "error"
      });
      return;
    }

    if (password.length < 8) {
      setMessage({
        text: "A senha deve ter pelo menos 8 caracteres.",
        type: "error"
      });
      return;
    }

    setIsSubmitting(true);
    setMessage({ text: "", type: "" });
    
    try {
      const response = await fetch(`${config.backendUrl}/api/auth/password-reset/confirm/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid,
          token,
          new_password: password
        }),
      });

      if (response.ok) {
        setMessage({
          text: "Senha redefinida com sucesso. Redirecionando para a página de login...",
          type: "success"
        });
        
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        const data = await response.json();
        throw new Error(data.detail || "Failed to reset password.");
      }
    } catch (error) {
      console.error("Password reset error:", error);
      setMessage({
        text: error instanceof Error ? error.message : "Ocorreu um erro ao redefinir sua senha.",
        type: "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="reset-password-page">
        <div className="reset-password-container">
          <div className="reset-password-card">
            <p className="loading">Verificando o link de redefinição...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className="reset-password-page">
        <div className="reset-password-container">
          <div className="reset-password-card">
            <div className={`message error`}>
              {message.text}
            </div>
            <div className="reset-password-footer">
              <Link to="/recuperar-senha" className="link">
                Solicitar um novo link
              </Link>
              <Link to="/login" className="back-link">
                <span className="back-arrow">←</span> Voltar ao login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        <div className="reset-password-card">
          <div className="reset-password-header">
            <h2>Redefinir Palavra-Passe</h2>
            <p>Crie uma nova senha para sua conta.</p>
          </div>

          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="reset-password-form">
            <div className="form-group">
              <label htmlFor="password">Nova Senha</label>
              <div className="password-container">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Insira sua nova senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="reset-password-input"
                  disabled={isSubmitting}
                  minLength={8}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={togglePasswordVisibility}
                  disabled={isSubmitting}
                >
                  {passwordVisible ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12c1.5-4.5 6-7.5 9.75-7.5s8.25 3 9.75 7.5c-1.5 4.5-6 7.5-9.75 7.5S3.75 16.5 2.25 12z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223a10.477 10.477 0 00-.73 1.277C2.25 12 6 15 12 15c1.5 0 2.91-.3 4.17-.84m3.65-2.16c.3-.45.56-.93.79-1.44M9.75 9.75a3.75 3.75 0 015.25 5.25M3 3l18 18"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Nova Senha</label>
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirme sua nova senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="reset-password-input"
                disabled={isSubmitting}
                minLength={8}
              />
            </div>

            <button 
              type="submit" 
              className={`reset-password-button ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processando...' : 'Redefinir Senha'}
            </button>
          </form>

          <div className="reset-password-footer">
            <Link to="/login" className="back-link">
              <span className="back-arrow">←</span> Voltar ao login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;