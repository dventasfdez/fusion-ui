import clsx from "clsx";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";

type IconProps = DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> & {
  name: string;
  variant?: "outlined" | "rounded" | "sharp";
  size?: "small" | "large";
  weight?: 100 | 200 | 300 | 400 | 500 | 700;
};

const Icon: React.FC<IconProps> = ({
  name,
  variant = "outlined",
  size,
  weight,
  className,
}) => {
  return (
    <span
      className={clsx(
        "icon",
        `icon_${variant}`,
        {
          [`icon_${size}`]: size,
        },
        {
          [`icon_${weight}`]: weight,
        },
        className
      )}
      aria-hidden="true"
    >
      {name}
    </span>
  );
};

export default Icon;
