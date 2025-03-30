import React from 'react';
import styled from 'styled-components';
import { FaWhatsapp } from 'react-icons/fa';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  phoneNumber, 
  message = "Hello, I have a question" 
}) => {
  // Format the phone number and message for the WhatsApp URL
  const formattedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${formattedMessage}`;

  return (
    <ButtonContainer>
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
      >
        <WhatsAppIcon size={28} />
        <Tooltip>Need help? Chat with us!</Tooltip>
      </a>
    </ButtonContainer>
  );
};

// Styled components
const Tooltip = styled.span`
  visibility: hidden;
  opacity: 0;
  width: max-content;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 8px 12px;
  position: absolute;
  z-index: 1;
  right: 60px;
  transition: all 0.3s ease;
  font-size: 14px;
  pointer-events: none;
  
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent transparent #333;
  }
`;

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    background-color: #25D366;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
    transition: all 0.3s ease;
    position: relative;
    
    &:hover {
      background-color: #128C7E;
      transform: scale(1.1);
      box-shadow: 0 6px 16px rgba(37, 211, 102, 0.4);
      
      ${Tooltip} {
        visibility: visible;
        opacity: 1;
        right: 70px;
      }
    }
  }
`;

const WhatsAppIcon = styled(FaWhatsapp)`
  color: white;
`;

export default WhatsAppButton;