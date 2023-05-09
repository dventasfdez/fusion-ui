import React from 'react';

export interface ICardFigureProps {
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

const CardFigure: React.FC<ICardFigureProps> = (props) => {
  const {id, children, className, ...rest} = props;

  return (
    <div id={id || ''} className={`card-figure ${className || ''}`} {...rest}>
      {children}
    </div>
  );
};

export default CardFigure;
