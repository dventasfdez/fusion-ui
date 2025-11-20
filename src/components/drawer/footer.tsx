import clsx from "clsx";
import React, { HTMLAttributes } from "react";

const DrawerFooter: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={clsx("drawer-footer", className)} {...props}>
    {children}
  </div>
);

export default DrawerFooter;
