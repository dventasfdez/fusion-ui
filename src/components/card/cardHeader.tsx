import React from "react";

export interface ICardHeaderProps {
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

const CardHeader: React.FC<ICardHeaderProps> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <div className={`card-header ${className ?? ""}`} {...rest}>
      {children}
    </div>
  );
};

export default CardHeader;
