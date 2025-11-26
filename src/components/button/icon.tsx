import clsx from "clsx";
import React, { ButtonHTMLAttributes, ComponentProps } from "react";
import Icon from "../icon/icon";

type IconButtonColor =
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "error"
  | "warning"
  | "neutral";
type IconButtonAppearance = "filled" | "outlined" | "text";
type IconButtonSize = "small" | "large";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  Omit<ComponentProps<typeof Icon>, "color"> & {
    /** Visual intent color. */
    color?: IconButtonColor;
    /** Style treatment for the button surface. */
    appearance?: IconButtonAppearance;
    /** Control density and typography scale. Defaults to "medium". */
    size?: IconButtonSize;
  };

/**
 * Button with color, appearance, and size variants. Forwards native button
 * attributes and defaults `type` to "button".
 */
const IconButton: React.FC<IconButtonProps> = ({
  name,
  className,
  color,
  appearance,
  size,
  type = "button",
  children,
  variant,
  weight,
  ...props
}) => {
  const classes = clsx(
    {
      button_primary: color === "primary",
      button_secondary: color === "secondary",
      button_accent: color === "accent",
      button_success: color === "success",
      button_error: color === "error",
      button_warning: color === "warning",
      button_neutral: color === "neutral",
    },
    {
      button_outlined: appearance === "outlined",
      button_text: appearance === "text",
    },
    {
      icon_button_small: size === "small",
      icon_button: !size,
      icon_button_large: size === "large",
    },
    className
  );

  return (
    <button type={type} className={classes} {...props}>
      <Icon name={name} size={size} variant={variant} weight={weight} />
    </button>
  );
};

export default IconButton;
