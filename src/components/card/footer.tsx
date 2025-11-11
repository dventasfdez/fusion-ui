import clsx from "clsx";
import React, { HTMLAttributes } from "react";

const CardFooter: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={clsx("card-footer", className)} {...props}>
      {children}
    </div>
  );
};

export default CardFooter;
