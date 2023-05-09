import React from 'react';

export interface IHeroBackgroundProps {
  /**
   * Apply different styles for Hero Background
   */
  className?: string;
  [others: string]: any;
}

const HeroBackground: React.FC<IHeroBackgroundProps> = ({className, children, ...rest}) => {
  if (children) {
    const _child = React.cloneElement(children as any, {
      ...(children as any).props,
      ...rest,
      className: `hero-background ${className || ''} ${(children as any).props.className || ''}`,
    });
    return _child;
  }
  return null;
};

export default HeroBackground;
