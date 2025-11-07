import clsx from "clsx";
import React, {
  ButtonHTMLAttributes,
  cloneElement,
  ComponentProps,
  ReactElement,
  useMemo,
} from "react";
import Icon from "../icon/icon";

type IconButtonColor =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "warning";
type IconButtonAppearance = "filled" | "outlined" | "text";
type IconButtonSize = "small" | "large";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Visual intent color. */
  color?: IconButtonColor;
  /** Style treatment for the button surface. */
  appearance?: IconButtonAppearance;
  /** Control density and typography scale. Defaults to "medium". */
  size?: IconButtonSize;
  children: ReactElement<ComponentProps<typeof Icon>, typeof Icon>;
};

/**
 * Button with color, appearance, and size variants. Forwards native button
 * attributes and defaults `type` to "button".
 */
const IconButton: React.FC<IconButtonProps> = ({
  className,
  color,
  appearance,
  size,
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
      icon_button_small: size === "small",
      icon_button: !size,
      icon_button_large: size === "large",
    },
    className
  );

  const injectedChildren = useMemo(
    () =>
      cloneElement(children, {
        ...children.props,
        size,
      }),
    [children, size]
  );

  return (
    <button type={type} className={classes} {...rest}>
      {injectedChildren}
    </button>
  );
};

export default IconButton;
