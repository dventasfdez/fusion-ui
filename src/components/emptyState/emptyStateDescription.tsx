import React from "react";

interface IEmptyStateProps {
  className?: string;
  [others: string]: any;
}

const Description: React.FC<IEmptyStateProps> = ({ className, children, ...rest }) => {
  return (
    <div className={`subtitle ${className || ""}`} {...rest}>
      {children}
    </div>
  );
};

export default Description;
