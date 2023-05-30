import React from 'react';
import {useSidebar} from './sidebar';

export interface ISidebarDividerProps {
  /**
   * Add class to sidebar divider
   */
  className?: string;
  [others: string]: any;
}

const SidebarDivider: React.FC<ISidebarDividerProps> = (props) => {
  const {children, className, ...rest} = props;
  const {collapsed} = useSidebar();
  return collapsed ? (
    <hr className="sidebar-divider" {...rest} />
  ) : (
    <div className={`sidebar-divider ${className || ''}`} {...rest}>
      {children}
    </div>
  );
};

export default SidebarDivider;
