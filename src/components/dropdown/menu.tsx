import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import ReactDOM from "react-dom";
import { useDropdown } from "./dropdown";

type DropdownMenuProps = HTMLAttributes<HTMLDivElement>;

/**
 * DropdownMenu renders popup content positioned relative to the trigger.
 * It portals into the dropdown container and closes on click unless
 * `keepShown` is set.
 */
const DropdownMenu: React.FC<DropdownMenuProps> = ({
  className,
  children,
  ...rest
}) => {
  const { show, menuRef, position, dropdownRef, handleClickMenu, keepShown } =
    useDropdown();

  const content = (
    <div
      ref={menuRef}
      className={`dropdown-menu ${show ? "" : "hidden"} ${className ?? ""}`}
      style={position}
      onClick={!keepShown ? handleClickMenu : undefined}
      {...rest}
    >
      {children}
    </div>
  );

  if (dropdownRef && dropdownRef.current) {
    return ReactDOM.createPortal(content, dropdownRef.current);
  }

  return null;
};

export default DropdownMenu;
