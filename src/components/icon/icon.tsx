import clsx from "clsx";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";

type IconProps = HTMLAttributes<HTMLSpanElement> & {
  /** Material Symbols glyph name from https://fonts.google.com/icons */
  name: string;
  /** Visual family variant. */
  variant?: "outlined" | "rounded" | "sharp";
  /** Optional size token */
  size?: "small" | "large";
  /** Optional variable font weight */
  weight?: 100 | 200 | 300 | 400 | 500 | 700;
};

/**
 * Icon renders a Material Symbols icon via text ligatures.
 * It outputs a span with utility classes to control visual variant,
 * optional size, and optional weight, and is marked aria-hidden.
 */
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
