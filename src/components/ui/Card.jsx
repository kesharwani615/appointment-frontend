import React from 'react';

const Card = ({ children, className = '', padding = 'p-6', glass = true }) => {
  return (
    <div className={`${glass ? 'glass-card' : 'bg-bg-dark rounded-2xl border border-glass-border'} ${padding} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
