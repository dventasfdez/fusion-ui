import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useRef,
} from "react";
import { useDropdown } from "./dropdown";
import clsx from "clsx";

export type DropdownButtonProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
/**
 * DropdownButton is the clickable trigger for a `Dropdown`. It uses context
 * to toggle the menu and forwards div attributes.
 */
const DropdownButton: React.FC<DropdownButtonProps> = ({
  children,
  className,
  ...props
}) => {
  const { onToggleMenu, buttonRef, disabled } = useDropdown();

  return (
    <div
      ref={buttonRef}
      className={clsx("dropdown-button", disabled, className)}
      onClick={onToggleMenu}
      {...props}
    >
      {children}
    </div>
  );
};

export default React.memo(DropdownButton);
