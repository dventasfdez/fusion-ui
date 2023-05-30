import React from "react";
export interface ICardFloatButtonsProps {
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

const CardFloatButtons: React.FC<ICardFloatButtonsProps> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <div className={`card-float-buttons ${className ?? ""}`} {...rest}>
      {children}
    </div>
  );
};

export default CardFloatButtons;
