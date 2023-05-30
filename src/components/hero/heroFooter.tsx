import React from 'react';

export interface IHeroFooterProps {
  /**
   * Apply different styles for Hero Footer
   */
  className?: string;
  /**
   * Add caption to the Hero Footer
   */
  caption?: string;
  [others: string]: any;
}

const HeroFooter: React.FC<IHeroFooterProps> = ({className, children, ...rest}) => {
  return (
    <div className={`hero-footer ${className || ''}`} {...rest}>
      {children}
    </div>
  );
};

export default HeroFooter;
