import React, { useContext, useEffect, useMemo, useRef, useState } from "react";

export { default as DropdownButton } from "./dropdownButton";
export { default as DropdownMenu } from "./dropdownMenu";
const DropdownContext = React.createContext({});
type DropdownPosition = "top" | "bottom" | "right" | "left";
interface IDropdownProps {
  className?: string;
  disabled?: boolean;
  onChangeToggleMenu?: (state: boolean) => void;
  itemsDivider?: boolean;
  forceRefresh?: number;
  defaultShow?: boolean;
  keepShown?: boolean;
  placement?: DropdownPosition;
  [others: string]: any;
}

interface IDropdownContext {
  showMenu: boolean;
  disabled: boolean;
  setDropdownMenuDimensions: (dimensions: { width: number; height: number }) => void;
  setDropdownButtonDimensions: (dimensions: { width: number; height: number }) => void;
  handleClickMenu: (e: React.MouseEvent<HTMLDivElement>) => void;
  position: { left: string; top: string };
  itemsDivider: boolean;
  dropdownRef: React.RefObject<HTMLDivElement>;
  onToggleMenu: () => void;
  keepShown: boolean;
}

const Dropdown: React.FC<IDropdownProps> = ({ children, disabled, className, onChangeToggleMenu, itemsDivider, forceRefresh, defaultShow, keepShown = false, placement = "bottom", ...rest }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [refresh, setRefresh] = useState(forceRefresh ? forceRefresh : 0);
  const [dropdownMenuDim, setDropdownMenuDim] = useState({ width: 0, height: 0 });
  const [dropdownButtonDim, setDropdownButtonDim] = useState({ width: 0, height: 0 });

  const dropdownRef = useRef<HTMLDivElement>(null);

  const onToggleMenu = () => {
    if (typeof onChangeToggleMenu === "function") onChangeToggleMenu(!showMenu);
    setShowMenu((prev) => {
      return !prev;
    });
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (event && event.target) {
      if (dropdownRef && dropdownRef.current && dropdownRef.current.getAttribute("data-show") === "true" && !dropdownRef.current.contains(event.target as Node)) {
        setShowMenu(false);
        if (typeof onChangeToggleMenu === "function") onChangeToggleMenu(false);
      }
    }
  };

  const handleClickMenu = () => {
    if (!keepShown) {
      setShowMenu(false);
      if (typeof onChangeToggleMenu === "function") onChangeToggleMenu(false);
    }
  };

  const topStr = (top: number, menuHeight: number) => `calc(${top}px - ${menuHeight}px - var(--unit))`;
  const bottomStr = (top: number, buttonHeight: number) => `calc(${top}px + ${buttonHeight}px + var(--unit))`;
  const rightStr = (left: number, buttonWidth: number) => `calc(${left}px + ${buttonWidth}px + var(--unit))`;
  const leftStr = (left: number, menuWidth: number) => `calc(${left}px - ${menuWidth}px - var(--unit))`;
  const leftAlignment = (left: number) => `${left}px`;
  const rightAlignment = (left: number, menuWidth: number, buttonWidth: number) => `calc(${left}px + ${buttonWidth}px - ${menuWidth}px)`;
  const topAlignment = (top: number) => `${top}px`;
  const bottomAlignment = (top: number, menuHeight: number, buttonHeight: number) => `calc(${top}px + ${buttonHeight}px - ${menuHeight}px)`;

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, []);

  useEffect(() => {
    if (showMenu && typeof document !== "undefined") {
      document.addEventListener(
        "scroll",
        () => {
          if (showMenu) setRefresh((prev) => prev + 1);
        },
        true
      );
      return () =>
        document.removeEventListener("scroll", () => {
          if (showMenu) setRefresh((prev) => prev + 1);
        });
    }
  }, [showMenu]);

  useEffect(() => {
    if (defaultShow !== undefined && defaultShow !== showMenu) {
      setShowMenu(defaultShow as boolean);
    }
  }, [defaultShow]);

  useEffect(() => {
    if (forceRefresh && refresh !== forceRefresh) setRefresh(forceRefresh);
  }, [forceRefresh, refresh]);

  const position = useMemo(() => {
    let left,
      top = "",
      dropdownMenuWidth = 0;

    if (dropdownRef && dropdownRef.current && showMenu) {
      const position = dropdownRef.current.getBoundingClientRect();
      dropdownMenuWidth = dropdownMenuDim.width < dropdownButtonDim.width ? dropdownButtonDim.width : dropdownMenuDim.width;
      const { clientHeight, clientWidth } = document.body;

      switch (placement) {
        case "top":
          if (position.top - dropdownMenuDim.height - 8 < 0) {
            top = bottomStr(position.top, dropdownButtonDim.height);
          } else {
            top = topStr(position.top, dropdownMenuDim.height);
          }
          if (position.left + dropdownMenuWidth > clientWidth) {
            left = rightAlignment(position.left, dropdownMenuWidth, dropdownButtonDim.width);
          } else {
            left = leftAlignment(position.left);
          }
          break;
        case "right":
          if (position.left + position.width + dropdownMenuWidth + 8 > clientWidth) {
            left = leftStr(position.left, dropdownMenuWidth);
          } else {
            left = rightStr(position.left, dropdownButtonDim.width);
          }
          if (position.top + dropdownMenuDim.height > clientHeight) {
            top = bottomAlignment(position.top, dropdownMenuDim.height, dropdownButtonDim.height);
          } else {
            top = topAlignment(position.top);
          }
          break;
        case "bottom":
          if (position.top + position.height + dropdownMenuDim.height + 8 > clientHeight) {
            top = topStr(position.top, dropdownMenuDim.height);
          } else {
            top = bottomStr(position.top, dropdownButtonDim.height);
          }
          if (position.left + dropdownMenuWidth > clientWidth) {
            left = rightAlignment(position.left, dropdownMenuWidth, dropdownButtonDim.width);
          } else {
            left = leftAlignment(position.left);
          }
          break;
        case "left":
          if (position.left - dropdownMenuWidth - 8 < 0) {
            left = rightStr(position.left, dropdownButtonDim.width);
          } else {
            left = leftStr(position.left, dropdownMenuWidth);
          }
          if (position.top + dropdownMenuDim.height > clientHeight) {
            top = bottomAlignment(position.top, dropdownMenuDim.height, dropdownButtonDim.height);
          } else {
            top = topAlignment(position.top);
          }
          break;
      }
      if (position.top < 0 || position.bottom > clientHeight) onToggleMenu();
    }

    return { left, top, width: `${dropdownMenuWidth}px` };
  }, [dropdownMenuDim, dropdownButtonDim, refresh]);

  return (
    <DropdownContext.Provider
      value={{
        showMenu,
        disabled,
        setDropdownMenuDimensions: setDropdownMenuDim,
        setDropdownButtonDimensions: setDropdownButtonDim,
        handleClickMenu,
        itemsDivider,
        dropdownRef,
        onChangeToggleMenu,
        onToggleMenu,
        position,
      }}
    >
      <div ref={dropdownRef} className={`dropdown ${className ?? ""}`} data-show={showMenu} {...rest}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

export default Dropdown;
/**
 *
 * @internal
 */
export const useDropdown = () => useContext(DropdownContext) as IDropdownContext;
