import React from 'react';

interface IEmptyStateProps {
  className?: string;
}

const Description: React.FC<IEmptyStateProps> = ({className, children, ...rest}) => {
  return (
    <div className={`subtitle ${className || ''}`} {...rest}>
      {children}
    </div>
  );
};

export default Description;
