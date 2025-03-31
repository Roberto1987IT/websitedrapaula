import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
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
        <MessageCircle className="whatsapp-icon" size={28} />
        <div className={`tooltip ${isHovered ? 'visible' : ''}`}>
          Precisa de ajuda? Fale conosco!
          <span className="tooltip-arrow"></span>
        </div>
      </a>
    </div>
  );
};

export default WhatsAppButton;