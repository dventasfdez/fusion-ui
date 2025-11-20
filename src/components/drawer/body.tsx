import clsx from "clsx";
import React, { FC, HTMLAttributes } from "react";

const DrawerBody: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={clsx("drawer-body", className)} {...props}>
    {children}
  </div>
);

export default DrawerBody;
