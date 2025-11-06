import clsx from "clsx";
import React, { DetailedHTMLProps, AnchorHTMLAttributes } from "react";

type BreadcrumbItemProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & {
  /** Text label for this breadcrumb link. */
  title: string;
  /**
   * @private
   */
  active?: boolean;
};

/**
 * BreadcrumbItem is a single clickable segment within a `Breadcrumb` trail.
 * Truncates long titles to keep layout compact.
 */
const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  title,
  active,
  className,
  ...props
}) => {
  const truncateBreadcrumbTitle = () => {
    if (title.length > 30) {
      return `${title.substring(0, 30)}...`;
    }
    return title;
  };

  return (
    <a
      target="_self"
      className={clsx("breadcrumb", { active }, className)}
      {...props}
    >
      {truncateBreadcrumbTitle()}
    </a>
  );
};

export default BreadcrumbItem;
