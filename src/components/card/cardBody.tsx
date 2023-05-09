import React from 'react';

export interface ICardBodyProps {
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

const CardBody: React.FC<ICardBodyProps> = (props) => {
  const {id, children, className, ...rest} = props;

  return (
    <div id={id || ''} className={`card-body ${className || ''}`} {...rest}>
      {children}
    </div>
  );
};

export default CardBody;
