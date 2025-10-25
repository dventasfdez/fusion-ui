import { DetailedHTMLProps, HTMLAttributes } from "react";
import { useDevice } from "../../hooks/useDevice/useDevice";
import clsx from "clsx";

type BadgeProps = DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> & {
  color?: "error" | "success" | "warning";
  size?: "small" | "large";
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
      badge_small: size === "small" || isMobile,
      badge_large: size === "large" && !isMobile,
    },
    {
      badge_success: color === "success",
      badge_warning: color === "warning",
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
