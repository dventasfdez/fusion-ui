import { HTMLAttributes } from "react";
import { useDevice } from "../../hooks/useDevice/useDevice";
import clsx from "clsx";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  /** Visual intent color of the badge. */
  color?: "error" | "success" | "warning";
  /** Size of the badge. Defaults to responsive behavior on mobile. */
  size?: "small" | "large";
};

/**
 * Badge displays small status or count-like UI next to other elements.
 * Sizes adapt on mobile via `useDevice`.
 */
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
