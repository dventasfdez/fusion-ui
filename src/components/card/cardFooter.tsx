import React from 'react';

export interface ICardFooterProps {
  /**
   * Identifies the accordion item
   */
  id?: string;
  /**
   * Add class to accordion
   */
  className?: string;
  [others: string]: any;
}

const CardFooter: React.FC<ICardFooterProps> = (props) => {
  const {id, children, className, ...rest} = props;

  return (
    <div id={id || ''} className={`card-footer ${className || ''}`} {...rest}>
      {children}
    </div>
  );
};

export default CardFooter;
