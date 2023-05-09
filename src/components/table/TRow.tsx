import React from 'react';

export interface ITRowProps {
  active?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  [others: string]: any;
}

const TRow: React.FC<ITRowProps> = ({children, active, disabled, className, onClick, ...rest}) => {
  return (
    <tr
      tabIndex={0}
      data-disabled={disabled}
      className={`${className || ''}${active ? 'active' : ''}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </tr>
  );
};

export default TRow;
