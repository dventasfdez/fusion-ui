import React from 'react';

export interface IFooterHeaderProps {
  /**
   * Adds classname to the footer header
   * */
  className?: string;
  [others: string]: any;
}

const FooterHeader: React.FC<IFooterHeaderProps> = (props) => {
  const {className, children, ...rest} = props;
  return (
    <div className={`footer-header ${className || ''}`} {...rest}>
      {children}
    </div>
  );
};

export default FooterHeader;