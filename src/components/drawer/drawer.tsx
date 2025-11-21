import React, { useRef, useEffect, HTMLAttributes, useMemo } from "react";
import ReactDOM from "react-dom";
import IconButton from "../button/icon";
import clsx from "clsx";

export { default as DrawerHeader } from "./header";
export { default as DrawerBody } from "./body";
export { default as DrawerFooter } from "./footer";

type DrawerPosition = "left" | "right";
type DrawerProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * To display the drawer if is render as portal
   */
  open: boolean;

  overlayClassName?: string;
  portal?: boolean;
  position?: DrawerPosition;
  /**
   * handler function for the close button
   */
  onClose: () => void;
  /**
   * handler function for the back button
   */
  onBack?: () => void;
};

const Drawer: React.FC<DrawerProps> = ({
  open,

  className,
  children,
  portal,
  position = "left",
  onClose,
  onBack,
  overlayClassName,
  ...props
}) => {
  const drawerWrapperRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (event && event.target) {
      if (
        open &&
        drawerWrapperRef &&
        drawerWrapperRef.current &&
        !drawerWrapperRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
  };

  useEffect(() => {
    if (open && typeof document !== "undefined") {
      debugger;
      document.addEventListener("click", handleClickOutside);
      return () => {
        return document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [open]);

  const back = useMemo(
    () =>
      typeof onBack === "function" && (
        <IconButton
          type="button"
          name={position === "left" ? "arrow_back" : "arrow_forward"}
          className="drawer-back-button"
          onClick={onBack}
        />
      ),
    [onBack]
  );

  const close = useMemo(
    () =>
      typeof onClose === "function" && (
        <IconButton
          type="button"
          name="close"
          className="drawer-close-button"
          onClick={onClose}
        />
      ),
    [onClose]
  );

  const drawer = (
    <div
      ref={drawerWrapperRef}
      className={clsx("drawer-wrapper", className, {
        [position]: portal,
      })}
      {...props}
    >
      {(typeof onBack === "function" || typeof onClose === "function") && (
        <div className="drawer-buttons-container">
          {back}
          {close}
        </div>
      )}
      {children}
    </div>
  );

  const drawerOverlay = (
    <div className="fusion-ui drawer-overlay">{drawer}</div>
  );

  const container = document.getElementById("root") || document.body;

  return open
    ? portal
      ? ReactDOM.createPortal(drawerOverlay, container as Element)
      : drawerOverlay
    : null;
};

export default Drawer;
