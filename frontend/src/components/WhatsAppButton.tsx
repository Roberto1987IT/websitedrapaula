import React, { useState } from 'react';
import '../styles/WhatsAppButton.css';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  phoneNumber = "351964309035", // Default Portugal number
  message = "Olá, gostaria de mais informações", // Default Portuguese message
  className
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Format phone number to international standard without spaces or special chars
  const formatPhoneNumber = (num: string) => {
    // Remove all non-digit characters
    let digits = num.replace(/\D/g, '');
    
    // Remove leading zeros if present
    digits = digits.replace(/^0+/, '');
    
    // Ensure country code is present (default to Portugal 351 if missing)
    if (!digits.startsWith('351') && digits.length > 0) {
      digits = `351${digits}`;
    }
    
    // Validate phone number length (typical mobile number is 9 digits plus country code)
    // If phone number is too long or too short, use default
    if (digits.length < 9 || digits.length > 15) {
      return '351964309035';
    }
    
    return digits;
  };

  const formattedNumber = formatPhoneNumber(phoneNumber);
  const encodedMessage = encodeURIComponent(message);
  
  // Create both web and direct app URLs
  const webUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
  const appUrl = `whatsapp://send?phone=${formattedNumber}&text=${encodedMessage}`;

  const handleClick = (e: React.MouseEvent) => {
    // Try to open the app first
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      e.preventDefault();
      window.location.href = appUrl;
      
      // Fallback to web URL after a delay if app doesn't open
      setTimeout(() => {
        window.location.href = webUrl;
      }, 300);
    }
    // Desktop will use the regular web URL via the href
  };

  return (
    <div className={`whatsapp-container ${className || ''}`}>
      <a 
        href={webUrl}
        target="_blank"
        rel="noopener noreferrer nofollow"
        aria-label="Fale conosco pelo WhatsApp"
        onClick={handleClick}
        className={`whatsapp-button ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="pulse-ring"></div>
        
        {/* WhatsApp Phone Icon SVG */}
        <svg 
          className="whatsapp-icon-svg" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          width="28" 
          height="28" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path 
            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" 
            fill="#FFFFFF"
            stroke="#FFFFFF"
          />
        </svg>
        
        <div className={`tooltip ${isHovered ? 'visible' : ''}`}>
          Precisa de ajuda? Fale conosco!
          <span className="tooltip-arrow"></span>
        </div>
      </a>
    </div>
  );
};

export default WhatsAppButton;