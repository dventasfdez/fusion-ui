import clsx from "clsx";
import React, { ButtonHTMLAttributes, FC, HTMLAttributes } from "react";
import Button from "../button/button";

type ChipProps = HTMLAttributes<HTMLDivElement> &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    active?: boolean;
  };
const Chip: FC<ChipProps> = ({ children, active, onClick, ...props }) => {
  const classes = clsx({
    chip: !active,
    chip_active: active,
  });

  if (onClick)
    return (
      <button className={classes} type="button" role="button" {...props}>
        {children}
      </button>
    );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Chip;
