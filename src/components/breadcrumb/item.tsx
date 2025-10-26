import clsx from "clsx";
import React, { DetailedHTMLProps, AnchorHTMLAttributes } from "react";

export type BreadcrumbItemProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & {
  title: string;
  /**
   * @internal
   */
  active?: boolean;
};

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
