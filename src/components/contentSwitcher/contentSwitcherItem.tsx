import React from "react";

export interface IContentSwitcherItemProps {
  id: string;
  /**
   * Identify if this tab is selected
   */
  active?: string;
  disabled?: boolean;
  /**
   * Name of icon in https://fonts.google.com/icons?icon.set=Material+Icons
   */
  icon?: string;
  title: string;
  badge?: number;
  [others: string]: any;
}

const ContentSwitcherItem: React.FC<IContentSwitcherItemProps> = (props) => {
  const { id, active, children, ...rest } = props;
  if (active)
    return (
      <div id={id} key={id} className="content-switcher-item-content" {...rest}>
        {children}
      </div>
    );
  return null;
};

export default ContentSwitcherItem;
