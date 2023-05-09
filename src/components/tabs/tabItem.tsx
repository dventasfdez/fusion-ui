import React from 'react';

export interface ITabItemProps {
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
   * Identify if this tab is selected
   */
  activeTab?: string;
  /**
   * Identify if this tab is disabled
   */
  disabled?: boolean;
  [others: string]: any;
}

const TabItem: React.FC<ITabItemProps> = (props) => {
  const {id, activeTab, children, title, ...rest} = props;

  return activeTab ? (
    <div
      {...rest}
      data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-content` : undefined}
      id={`${id || title}-content`}
      key={`${id || title}-content`}
      className="tab-content"
    >
      {children}
    </div>
  ) : (
    <></>
  );
};

export default TabItem;
