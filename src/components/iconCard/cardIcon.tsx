import React from 'react';

export interface ICardIconProps {
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

const CardIcon: React.FC<ICardIconProps> = (props) => {
  const {id, children, className, ...rest} = props;

  return (
    <div id={id || ''} className={`card-icon ${className || ''}`} {...rest}>
      {children}
    </div>
  );
};

export default CardIcon;
