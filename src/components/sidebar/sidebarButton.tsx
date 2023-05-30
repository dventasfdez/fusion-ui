import React from 'react';
import Dropdown, {DropdownButton, DropdownMenu} from '../dropdown/dropdown';
import {useSidebar} from './sidebar';

export interface ISidebarButtonProps {
  /**
   * Identifies the button in sidebar
   */
  id: string;
  /**
   * Set the icon element in sidebar button
   */
  icon: any;
  /**
   * Set the label element in sidebar button
   */
  label: string;
  /**
   * Set if this element is a dropdown
   */
  dropdown?: boolean;
  viewMore?: boolean;
  /**
   * Set the route to redirect when button is clicked
   */
  href?: string;
  /**
   * Identifies if sidebar is collapsed or not
   */
  //collapsed?: boolean;
  /**
   * Set if sidebar button is selected
   */
  //selected?: boolean;
  /**
   * Set if sidebar button is disabled
   */
  disabled?: boolean;
  /**
   * Function when item is clicked
   */
  onClick?: (e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement>) => void;
  /**
   * Add class to sidebar button
   */
  className?: string;
  [others: string]: any;
}

const SidebarButton: React.FC<ISidebarButtonProps> = ({
  id,
  icon,
  label,
  dropdown,
  viewMore,
  href,
  disabled,
  className,
  onClick,
  children,
  ...rest
}) => {
  const {collapsed, selected, onClickItem} = useSidebar();
  const isSelected = selected === id;
  const handleOnClick = (e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement>) => {
    if (typeof onClick === 'function') {
      onClick(e);
    }
    onClickItem(e);
  };

  return dropdown ? (
    <Dropdown className="sidebar-button_dropdown">
      <DropdownButton>
        <div
          id={id}
          key={id}
          className={`sidebar-button${isSelected ? '_selected' : ''}${disabled ? '_disabled' : ''} ${className || ''}`}
          onClick={handleOnClick}
          {...rest}
        >
          {icon}
          {!collapsed && (
            <>
              {label}
              {!viewMore && <span className="material-icons sidebar-button-arrow">arrow_right</span>}
            </>
          )}
        </div>
      </DropdownButton>
      <DropdownMenu>{children}</DropdownMenu>
    </Dropdown>
  ) : (
    <a
      id={id}
      key={id}
      className={`sidebar-button${isSelected ? '_selected' : ''}${disabled ? '_disabled' : ''} ${className || ''}`}
      href={href}
      onClick={handleOnClick}
      {...rest}
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </a>
  );
};

export default SidebarButton;
