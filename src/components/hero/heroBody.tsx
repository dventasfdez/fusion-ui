import React from 'react';

export interface IHeroBodyProps {
  /**
   * Apply different styles for Hero body
   */
  className?: string;
  [others: string]: any;
}

const HeroBody: React.FC<IHeroBodyProps> = ({className, children, ...rest}) => {
  return (
    <div className={`hero-body ${className || ''}`} {...rest}>
      {children}
    </div>
  );
};

export default HeroBody;
