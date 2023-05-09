import React from 'react';

interface IEmptyStateProps {
  className?: string;
}

const Title: React.FC<IEmptyStateProps & React.HTMLAttributes<HTMLHeadingElement>> = ({className, children, ...rest}) => {
  return (
    <h4 className={`empty-state-title ${className || ''}`} {...rest}>
      {children}
    </h4>
  );
};

export default Title;
