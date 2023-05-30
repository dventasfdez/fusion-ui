import React from 'react';

export interface IHeroHeaderProps {
  /**
   * Apply different styles for Hero Header
   */
  className?: string;
  [others: string]: any;
}

const HeroHeader: React.FC<IHeroHeaderProps> = ({className, children, ...rest}) => {
  return (
    <div className={`hero-header ${className || ''}`} {...rest}>
      {children}
    </div>
  );
};

export default HeroHeader;
