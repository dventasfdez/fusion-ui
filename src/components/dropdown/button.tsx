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
const DropdownButton: React.FC<DropdownButtonProps> = ({
  children,
  className,
  ...props
}) => {
  const { onToggleMenu, setDropdownButtonDimensions, showMenu, disabled } =
    useDropdown();

  const dropdownButtonRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (dropdownButtonRef && dropdownButtonRef.current) {
      const positionButton = dropdownButtonRef.current.getBoundingClientRect();
      if (positionButton)
        setDropdownButtonDimensions({
          width: positionButton.width,
          height: positionButton.height,
        });
    }
  }, [showMenu]);

  return (
    <div
      className={clsx("dropdown-button", disabled, className)}
      onClick={onToggleMenu}
      ref={dropdownButtonRef}
      {...props}
    >
      {children}
    </div>
  );
};

export default React.memo(DropdownButton);
