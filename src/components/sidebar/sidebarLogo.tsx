import React from 'react';

export interface ISidebarLogoProps {
  /**
   * Add class to sidebar logo
   */
  className?: string;
  [others: string]: any;
}

const SidebarLogo: React.FC<ISidebarLogoProps> = (props) => {
  const {children, className, ...rest} = props;

  return (
    <div className={`sidebar-logo ${className || ''}`} {...rest}>
      {children}
    </div>
  );
};

export default SidebarLogo;
