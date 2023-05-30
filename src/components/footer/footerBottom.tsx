import React from 'react';

export interface IFooterBottomProps {
  /**
   * Adds classname to the footer bottom
   * */
  className?: string;
  [others: string]: any;
}

const FooterBottom: React.FC<IFooterBottomProps> = (props) => {
  const {className, children, ...rest} = props;
  return (
    <div className={`footer-bottom ${className || ''}`} {...rest}>
      {children}
    </div>
  );
};

export default FooterBottom;