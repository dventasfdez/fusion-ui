import React from "react";

export interface IBreadcrumbItemProps {
  /**
   * Identifies the Breadcrumb item
   */
  id: string;
  /**
   * Breadcrumb title to display, should be string
   */
  title: string;
  /**
   * Breadcrumb link
   */
  href: string;
  [others: string]: any;
}

const BreadcrumbItem: React.FC<IBreadcrumbItemProps> = ({ id, title, href, ...rest }) => {
  const truncateBreadcrumbTitle = () => {
    if (title.length > 30) {
      return `${title.substring(0, 30)}...`;
    }
    return title;
  };

  return (
    <a href={href} target="_self" id={id} key={id} className="breadcrumb-item" {...rest}>
      {truncateBreadcrumbTitle()}
    </a>
  );
};

export default BreadcrumbItem;
