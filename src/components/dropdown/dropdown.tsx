import clsx from "clsx";
import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
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
  defaultShow?: boolean;
  keepShown?: boolean;
  placement?: DropdownPosition;
};

type DropdownContext = {
  show: boolean;
  disabled: boolean;
  menuRef: RefObject<HTMLDivElement>;
  dropdownRef: RefObject<HTMLDivElement>;
  buttonRef: RefObject<HTMLDivElement>;
  handleClickMenu: (e: React.MouseEvent<HTMLDivElement>) => void;
  position: { left: string; top: string };
  onToggleMenu: () => void;
  keepShown: boolean;
};

const Dropdown: React.FC<DropdownProps> = ({
  children,
  disabled,
  className,
  onChangeToggleMenu,
  defaultShow,
  keepShown = false,
  placement = "bottom",
  ...props
}) => {
  const [refresh, setRefresh] = useState(0);
  const [show, setShow] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const onToggleMenu = () => {
    if (typeof onChangeToggleMenu === "function") onChangeToggleMenu(!show);
    setShow((prev) => {
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
        setShow(false);
        if (typeof onChangeToggleMenu === "function") onChangeToggleMenu(false);
      }
    }
  };

  const handleClickMenu = () => {
    if (!keepShown) {
      setShow(false);
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
    if (show && typeof document !== "undefined") {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  });

  useEffect(() => {
    if (show && typeof document !== "undefined") {
      document.addEventListener(
        "scroll",
        () => {
          if (show) setRefresh((prev) => prev + 1);
        },
        true
      );
      return () =>
        document.removeEventListener("scroll", () => {
          if (show) setRefresh((prev) => prev + 1);
        });
    }
  }, [show]);

  useEffect(() => {
    if (defaultShow !== undefined && defaultShow !== show) {
      setShow(defaultShow as boolean);
    }
  }, [defaultShow]);

  // Load component after load dropdown
  useLayoutEffect(() => {
    setRefresh((prev) => prev + 1);
  }, [dropdownRef]);

  const position = useMemo(() => {
    let left,
      top = "",
      dropdownMenuWidth = 0;

    if (
      dropdownRef &&
      dropdownRef.current &&
      show &&
      menuRef &&
      menuRef.current &&
      buttonRef &&
      buttonRef.current
    ) {
      const _position = dropdownRef.current.getBoundingClientRect();
      const dropdownMenuDim = menuRef.current.getBoundingClientRect();
      const dropdownButtonDim = buttonRef.current.getBoundingClientRect();

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
  }, [show, dropdownRef, menuRef, buttonRef, refresh]);

  const callbackMenuRef = useCallback(
    (n: HTMLDivElement | null) => {
      menuRef.current = n;
    },
    [show]
  );
  const callbackButtonRef = useCallback((n: HTMLDivElement | null) => {
    buttonRef.current = n;
  }, []);

  return (
    <DropdownContext.Provider
      value={{
        dropdownRef,
        menuRef: callbackMenuRef,
        buttonRef: callbackButtonRef,
        show,
        disabled,
        handleClickMenu,
        onChangeToggleMenu,
        onToggleMenu,
        position,
      }}
    >
      <div
        ref={dropdownRef}
        className={clsx("dropdown", className)}
        data-show={show}
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
