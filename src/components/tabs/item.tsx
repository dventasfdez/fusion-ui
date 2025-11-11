import React, { HTMLAttributes } from "react";

type TabItemProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Identifies the tab item
   */
  id: string;
  /**
   * Tab name to show
   */
  title: string;
  /**
   * Adds the tab to the dropdown menu
   */
  collapsed?: boolean;
  /**
   * Identify if this tab is disabled
   */
  disabled?: boolean;
};

const TabItem: React.FC<TabItemProps> = ({ id, children, title, ...props }) => {
  return (
    <div
      {...props}
      data-testid={
        props && props["data-testid"]
          ? `${props["data-testid"]}-content`
          : undefined
      }
      id={`${id || title}-content`}
      key={`${id || title}-content`}
      className="tab-content"
    >
      {children}
    </div>
  );
};

export default TabItem;
