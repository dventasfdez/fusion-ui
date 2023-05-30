import React from 'react';

interface IDrawerFooterProps {
  className?: string;
  [others: string]: any;
}

const DrawerFooter: React.FC<IDrawerFooterProps> = ({className, children, ...rest}) => (
  <div {...rest} className={`drawer-footer ${className || ''}`}>
    {children}
  </div>
);

export default DrawerFooter;
