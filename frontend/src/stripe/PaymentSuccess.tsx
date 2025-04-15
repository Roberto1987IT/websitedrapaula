import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, CreditCard, ShoppingBag } from 'lucide-react';
import '../styles/stripeSuccess.css';

const PaymentSuccess: React.FC = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Show confetti animation
    const confettiElements = document.querySelectorAll('.confetti');
    confettiElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('active');
      }, index * 100);
    });

    // Track payment success event
    console.log('Payment success page viewed');
  }, []);

  return (
    <div className="success-container">
      <div className="confetti-container">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="confetti" style={{ 
            left: `${Math.random() * 100}%`, 
            animationDelay: `${Math.random() * 5}s` 
          }} />
        ))}
      </div>
      
      <div className="success-card">
        <div className="success-icon">
          <Check size={50} />
        </div>
        
        <h1 className="success-title">Pagamento Bem-sucedido!</h1>
        <p className="success-message">
          Obrigado pela sua compra. Sua transação foi concluída com sucesso.
        </p>
        
        <div className="order-details">
          <h2>Detalhes do Pedido</h2>
          <div className="detail-row">
            <span>Número do Pedido:</span>
            <span>#{Math.floor(100000 + Math.random() * 900000)}</span>
          </div>
          <div className="detail-row">
            <span>Data:</span>
            <span>{new Date().toLocaleDateString('pt-BR')}</span>
          </div>
          <div className="detail-row">
            <span>Método de Pagamento:</span>
            <span>Cartão de Crédito <CreditCard size={16} /></span>
          </div>
        </div>
        
        <div className="next-steps">
          <h2>Próximos Passos</h2>
          <ul className="steps-list">
            <li>Um e-mail de confirmação foi enviado para o seu endereço de e-mail registrado.</li>
            <li>Para quaisquer dúvidas, entre em contato com nossa equipa de suporte.</li>
          </ul>
        </div>
        
        <div className="success-actions">
          <Link to="/" className="home-button">
            <ShoppingBag size={18} />
            Continuar Comprando
          </Link>
          <button className="download-button">
            Baixar Recibo
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
