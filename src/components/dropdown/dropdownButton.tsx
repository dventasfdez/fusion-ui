import React, { useEffect } from "react";
import { useDropdown } from "./dropdown";
export interface DropdownButtonProps {
  className?: string;
  [others: string]: any;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ children, className, ...rest }) => {
  const { onToggleMenu, setDropdownButtonDimensions, showMenu, disabled } = useDropdown();
  const dropdownButtonRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (dropdownButtonRef && dropdownButtonRef.current) {
      const positionButton = dropdownButtonRef.current.getBoundingClientRect();
      if (positionButton) setDropdownButtonDimensions({ width: positionButton.width, height: positionButton.height });
    }
  }, [showMenu]);
  return (
    <div className={`dropdown-button${disabled ? "_disabled" : ""} ${className ?? ""}`} onClick={onToggleMenu} ref={dropdownButtonRef} {...rest}>
      {children}
    </div>
  );
};

export default React.memo(DropdownButton);
