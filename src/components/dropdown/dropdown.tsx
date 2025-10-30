import clsx from "clsx";
import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export { default as DropdownButton } from "./button";
export { default as DropdownMenu } from "./menu";

const DropdownContext = React.createContext({});

type DropdownPosition = "top" | "bottom" | "right" | "left";

type DropdownProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  disabled?: boolean;
  onChangeToggleMenu?: (state: boolean) => void;
  itemsDivider?: boolean;
  defaultShow?: boolean;
  keepShown?: boolean;
  placement?: DropdownPosition;
};

type DropdownContext = {
  showMenu: boolean;
  disabled: boolean;
  setDropdownMenuDimensions: (dimensions: {
    width: number;
    height: number;
  }) => void;
  setDropdownButtonDimensions: (dimensions: {
    width: number;
    height: number;
  }) => void;
  handleClickMenu: (e: React.MouseEvent<HTMLDivElement>) => void;
  position: { left: string; top: string };
  itemsDivider: boolean;
  dropdownRef: React.RefObject<HTMLDivElement>;
  onToggleMenu: () => void;
  keepShown: boolean;
};

const Dropdown: React.FC<DropdownProps> = ({
  children,
  disabled,
  className,
  onChangeToggleMenu,
  itemsDivider,
  defaultShow,
  keepShown = false,
  placement = "bottom",
  ...props
}) => {
  const [refresh, setRefresh] = useState(0);

  const [showMenu, setShowMenu] = useState(false);
  const [dropdownMenuDim, setDropdownMenuDim] = useState({
    width: 0,
    height: 0,
  });
  const [dropdownButtonDim, setDropdownButtonDim] = useState({
    width: 0,
    height: 0,
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  const onToggleMenu = () => {
    if (typeof onChangeToggleMenu === "function") onChangeToggleMenu(!showMenu);
    setShowMenu((prev) => {
      return !prev;
    });
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (event && event.target) {
      if (
        dropdownRef &&
        dropdownRef.current &&
        dropdownRef.current.getAttribute("data-show") === "true" &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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

  const topStr = (top: number, menuHeight: number) =>
    `calc(${top}px - ${menuHeight}px - var(--space-unit))`;
  const bottomStr = (top: number, buttonHeight: number) =>
    `calc(${top}px + ${buttonHeight}px + var(--space-unit))`;
  const rightStr = (left: number, buttonWidth: number) =>
    `calc(${left}px + ${buttonWidth}px + var(--space-unit))`;
  const leftStr = (left: number, menuWidth: number) =>
    `calc(${left}px - ${menuWidth}px - var(--space-unit))`;
  const leftAlignment = (left: number) => `${left}px`;
  const rightAlignment = (
    left: number,
    menuWidth: number,
    buttonWidth: number
  ) => `calc(${left}px + ${buttonWidth}px - ${menuWidth}px)`;
  const topAlignment = (top: number) => `${top}px`;
  const bottomAlignment = (
    top: number,
    menuHeight: number,
    buttonHeight: number
  ) => `calc(${top}px + ${buttonHeight}px - ${menuHeight}px)`;

  useEffect(() => {
    if (showMenu && typeof document !== "undefined") {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  });

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

  const position = useMemo(() => {
    let left,
      top = "",
      dropdownMenuWidth = 0;

    if (dropdownRef && dropdownRef.current && showMenu) {
      const _position = dropdownRef.current.getBoundingClientRect();
      dropdownMenuWidth =
        dropdownMenuDim.width < dropdownButtonDim.width
          ? dropdownButtonDim.width
          : dropdownMenuDim.width;
      const { clientHeight, clientWidth } = document.body;

      switch (placement) {
        case "top":
          if (_position.top - dropdownMenuDim.height - 8 < 0) {
            top = bottomStr(_position.top, dropdownButtonDim.height);
          } else {
            top = topStr(_position.top, dropdownMenuDim.height);
          }
          if (_position.left + dropdownMenuWidth > clientWidth) {
            left = rightAlignment(
              _position.left,
              dropdownMenuWidth,
              dropdownButtonDim.width
            );
          } else {
            left = leftAlignment(_position.left);
          }
          break;
        case "right":
          if (
            _position.left + _position.width + dropdownMenuWidth + 8 >
            clientWidth
          ) {
            left = leftStr(_position.left, dropdownMenuWidth);
          } else {
            left = rightStr(_position.left, dropdownButtonDim.width);
          }
          if (_position.top + dropdownMenuDim.height > clientHeight) {
            top = bottomAlignment(
              _position.top,
              dropdownMenuDim.height,
              dropdownButtonDim.height
            );
          } else {
            top = topAlignment(_position.top);
          }
          break;
        case "bottom":
          if (
            _position.top + _position.height + dropdownMenuDim.height + 8 >
            clientHeight
          ) {
            top = topStr(_position.top, dropdownMenuDim.height);
          } else {
            top = bottomStr(_position.top, dropdownButtonDim.height);
          }
          if (_position.left + dropdownMenuWidth > clientWidth) {
            left = rightAlignment(
              _position.left,
              dropdownMenuWidth,
              dropdownButtonDim.width
            );
          } else {
            left = leftAlignment(_position.left);
          }
          break;
        case "left":
          if (_position.left - dropdownMenuWidth - 8 < 0) {
            left = rightStr(_position.left, dropdownButtonDim.width);
          } else {
            left = leftStr(_position.left, dropdownMenuWidth);
          }
          if (_position.top + dropdownMenuDim.height > clientHeight) {
            top = bottomAlignment(
              _position.top,
              dropdownMenuDim.height,
              dropdownButtonDim.height
            );
          } else {
            top = topAlignment(_position.top);
          }
          break;
      }
      if (_position.top < 0 || _position.bottom > clientHeight) onToggleMenu();
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
      <div
        ref={dropdownRef}
        className={clsx("dropdown", className)}
        data-show={showMenu}
        {...props}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

export default Dropdown;

/**
 * @internal
 */
export const useDropdown = () => useContext(DropdownContext) as DropdownContext;
