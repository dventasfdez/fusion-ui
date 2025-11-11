import clsx from "clsx";
import React, { HTMLAttributes } from "react";

const CardHeader: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={clsx("card-header", className)} {...props}>
      {children}
    </div>
  );
};

export default CardHeader;
