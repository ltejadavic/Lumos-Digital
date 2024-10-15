import React from 'react';

type TextInputProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};

export const TextInput: React.FC<TextInputProps> = ({ label, value, onChange, type = 'text' }) => (
  <div className="form-group">
    <label>{label}</label>
    <input type={type} value={value} onChange={onChange} className="form-control" />
  </div>
);

type ButtonProps = {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: 'button' | 'submit';
};

export const Button: React.FC<ButtonProps> = ({ text, onClick, type = 'button' }) => (
  <button type={type} onClick={onClick} className="btn btn-primary">
    {text}
  </button>
);