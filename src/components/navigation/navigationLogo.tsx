import React from 'react';

interface INavigationLogo {
  className?: string;
  [others: string]: any;
}

const NavigationLogo: React.FC<INavigationLogo> = ({className, children, ...rest}) => {
  if (children) {
    return React.cloneElement(children as any, {
      ...(children as any).props,
      ...rest,
      className: `navigation-logo ${(children as any).props.className || ''} ${className || ''}`,
    });
  }
  return null;
};
export default NavigationLogo;
