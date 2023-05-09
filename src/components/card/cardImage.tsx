import React from 'react';

export interface ICardImgProps {
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

const CardImg: React.FC<ICardImgProps> = (props) => {
  const {id, children, className, ...rest} = props;
  const {hoverButton, ...restAux} = rest;
  return (
    <div id={id || ''} key={id || 'card-img'} className={`card-img ${className || ''}`} {...restAux}>
      {children}
      {hoverButton}
    </div>
  );
};

export default CardImg;
