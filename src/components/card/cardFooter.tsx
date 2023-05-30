import React from "react";

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
  const { children, className, ...rest } = props;

  return (
    <div className={`card-footer ${className ?? ""}`} {...rest}>
      {children}
    </div>
  );
};

export default CardFooter;
