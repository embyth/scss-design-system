import type React from 'react';
import './Button.styles.scss';

type TButtonProperties = {
  onClick?: () => void
  children?: React.ReactNode
}

export const Button: React.FC<TButtonProperties> = ({ onClick, children }) => (
  <button type="button" className="button" onClick={onClick}>{children}</button>
);
