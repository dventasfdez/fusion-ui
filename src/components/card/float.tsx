import clsx from "clsx";
import React, { HTMLAttributes } from "react";
const CardFloat: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={clsx("card-float", className)} {...props}>
      {children}
    </div>
  );
};

export default CardFloat;
