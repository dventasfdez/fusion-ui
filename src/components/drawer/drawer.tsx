import React, { useRef, useEffect, HTMLAttributes } from "react";
import ReactDOM from "react-dom";

export { default as DrawerHeader } from "./header";
export { default as DrawerBody } from "./body";
export { default as DrawerFooter } from "./footer";

type DrawerPosition = "left" | "right";
type DrawerProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * To display the drawer if is render as portal
   */
  open?: boolean;
  /**
   * Reference for parent element and render in absolute position on parent with overlay
   */
  parentRef?: any;

  /**
   * Set drawer as a portal with overlay
   */
  renderAsPortal?: boolean;
  position?: DrawerPosition;
  /**
   * handler function for the close button
   */
  onClose?: () => void;
  /**
   * handler function for the back button
   */
  onBack?: () => void;
  overlayClassName?: string;
};

const Drawer: React.FC<DrawerProps> = ({
  open,
  parentRef,
  className,
  children,
  renderAsPortal,
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
        if (typeof onClose === "function") onClose();
      }
    }
  };

  useEffect(() => {
    if (renderAsPortal && open && typeof document !== "undefined") {
      document.addEventListener("click", handleClickOutside);
      return () => {
        return document.removeEventListener("click", handleClickOutside);
      };
    }
  });

  const calculateWidthAndLeft = () => {
    let _width = "",
      _left = "";
    if (parentRef && parentRef.current) {
      const parent = parentRef.current.getBoundingClientRect();
      _width = `calc(100% - ${parent.width}px)`;
      _left = `${parent.width}px`;
      return { width: _width, left: _left };
    }
    return undefined;
  };

  const iconBack = typeof onBack === "function" && (
    <button type="button" className="drawer-back-button" onClick={onBack}>
      <span className="material-icons">arrow_back</span>
    </button>
  );

  const iconClose = typeof onClose === "function" && (
    <button type="button" className="drawer-close-button" onClick={onClose}>
      <span className="material-icons">close</span>
    </button>
  );

  const drawer = (
    <div
      ref={drawerWrapperRef}
      className={`drawer-wrapper ${className ?? ""} ${
        renderAsPortal ? position : ""
      }`}
      {...props}
    >
      {(typeof onBack === "function" || typeof onClose === "function") && (
        <div className="drawer-buttons-container">
          {iconBack}
          {iconClose}
        </div>
      )}
      {children}
    </div>
  );

  const drawerOverlay = (
    <div className="fusion-ui drawer-overlay" style={calculateWidthAndLeft()}>
      {drawer}
    </div>
  );

  if (renderAsPortal && typeof document !== "undefined") {
    const container = document.getElementById("root") || document.body;
    return open
      ? ReactDOM.createPortal(drawerOverlay, container as Element)
      : null;
  }

  return drawer;
};

export default Drawer;
