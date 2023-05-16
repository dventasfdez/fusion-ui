import React from "react";

export interface ICardTopProps {
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

const CardTop: React.FC<ICardTopProps> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <div className={`card-top ${className ?? ""}`} {...rest}>
      {children}
    </div>
  );
};

export default CardTop;
