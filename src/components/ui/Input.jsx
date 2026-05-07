import React from 'react';

const Input = ({ label, error, className = '', ...props }) => {
  return (
    <div className={`flex flex-col gap-3 w-full ${className}`}>
      {label && <label className="text-[10px] font-black text-text-dim uppercase tracking-[0.2em] ml-2">{label}</label>}
      <input
        className={`input-field px-6 py-4 rounded-2xl ${error ? 'border-error focus:border-error focus:shadow-none' : ''}`}
        {...props}
      />
      {error && <span className="text-xs text-error ml-1 mt-1">{error}</span>}
    </div>
  );
};

export default Input;