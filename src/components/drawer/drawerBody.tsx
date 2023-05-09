import React from 'react';

interface IDrawerBodyProps {
  className?: string;
  [others: string]: any;
}

const DrawerBody: React.FC<IDrawerBodyProps> = ({className, children, ...rest}) => (
  <div className={`drawer-body ${className || ''}`} {...rest}>
    {children}
  </div>
);

export default DrawerBody;
