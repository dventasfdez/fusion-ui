import React from 'react';

interface IDrawerHeaderProps {
  className?: string;
  [others: string]: any;
}

const DrawerHeader: React.FC<IDrawerHeaderProps> = ({className, children, ...rest}) => (
  <div {...rest} className={`drawer-header ${className || ''}`}>
    {children}
  </div>
);

export default DrawerHeader;
