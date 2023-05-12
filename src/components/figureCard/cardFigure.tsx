import React from "react";

export interface ICardFigureProps {
  /**
   * Add class to accordion
   */
  className?: string;
  [others: string]: any;
}

const CardFigure: React.FC<ICardFigureProps> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <div className={`card-figure ${className ?? ""}`} {...rest}>
      {children}
    </div>
  );
};

export default CardFigure;
