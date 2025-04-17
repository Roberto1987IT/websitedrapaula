import React from 'react';

interface BaseButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

// First define a base type, then extend it.  This avoids confusion and repetition.
export interface ButtonProps extends BaseButtonProps {
  size?: 'small' | 'medium' | 'large'; // Strongly type the size
  variant?: 'primary' | 'secondary' | 'text'; // Added the variant prop, strongly typed
  // Other props specific to Button can go here.
}

const getButtonClasses = (props: { className?: string; size?: 'small' | 'medium' | 'large'; variant?: 'primary' | 'secondary' | 'text' }) => {
  let classes = 'button'; // Basic button class

  if (props.size) {
    classes += ` button--${props.size}`; // e.g., button--small
  }

  if (props.variant) {
    classes += ` button--${props.variant}`;  // e.g., button--primary
  }

  if (props.className) {
    classes += ` ${props.className}`;  // Add custom classes
  }

  return classes;
};

export const Button: React.FC<ButtonProps> = ({ children, onClick, className, size, variant, ...rest }) => {  //Destructure all the props.

  const buttonClasses = getButtonClasses({ className, size, variant });

  return (
    <button onClick={onClick} className={buttonClasses} {...rest}>
      {children}
    </button>
  );
};