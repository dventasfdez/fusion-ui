import { DetailedHTMLProps, HTMLAttributes } from "react";
import { useDevice } from "../../hooks/useDevice/useDevice";
import clsx from "clsx";

type BadgeProps = DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> & {
  color?: "error" | "success" | "warning" | "info";
  size?: "small" | "medium" | "large";
};

const Badge: React.FC<BadgeProps> = ({
  children,
  color,
  size,
  className,
  ...rest
}) => {
  const { isMobile } = useDevice();
  const classes = clsx(
    "badge",
    className,
    {
      small: size === "small" || isMobile,
      large: size === "large" && !isMobile,
    },
    {
      badge_success: color === "success",
      badge_warning: color === "warning",
      badge_info: color === "info",
      badge_error: color === "error",
    }
  );
  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
};

export default Badge;
