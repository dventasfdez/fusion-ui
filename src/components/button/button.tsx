import clsx from "clsx";
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonColor = "primary" | "secondary" | "success" | "error" | "warning";
type ButtonAppearance = "filled" | "outlined" | "text";
type ButtonSize = "small" | "medium" | "large";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Visual intent color. */
  color?: ButtonColor;
  /** Style treatment for the button surface. */
  appearance?: ButtonAppearance;
  /** Control density and typography scale. Defaults to "medium". */
  size?: ButtonSize;
};

/**
 * Button with color, appearance, and size variants. Forwards native button
 * attributes and defaults `type` to "button".
 */
const Button: React.FC<ButtonProps> = ({
  className,
  color,
  appearance,
  size = "medium",
  children,
  type = "button",
  ...rest
}) => {
  const classes = clsx(
    {
      button_primary: color === "primary",
      button_secondary: color === "secondary",
      button_success: color === "success",
      button_error: color === "error",
      button_warning: color === "warning",
    },
    {
      button_outlined: appearance === "outlined",
      button_text: appearance === "text",
    },
    {
      button_small: size === "small",
      button_large: size === "large",
    },
    className
  );

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
};

export default Button;
