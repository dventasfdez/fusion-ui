import clsx from "clsx";
import React, { HTMLAttributes } from "react";

const DrawerHeader: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={clsx("drawer-header", className)} {...props}>
    {children}
  </div>
);

export default DrawerHeader;
