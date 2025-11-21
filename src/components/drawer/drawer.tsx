import React, {
  useRef,
  useEffect,
  HTMLAttributes,
  useMemo,
  useState,
  useCallback,
} from "react";
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
  const [closing, setClosing] = useState(false);
  const drawerOverlayRef = useRef<HTMLDivElement>(null);
  const drawerWrapperRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setClosing(true);
    const timeout = setTimeout(() => {
      setClosing(false);
      onClose();
    }, 300);
    return () => clearTimeout(timeout);
  }, [onClose]);

  const handleBack = useCallback(() => {
    setClosing(true);
    const timeout = setTimeout(() => {
      setClosing(false);
      onBack?.();
    }, 300);
    return () => clearTimeout(timeout);
  }, [onBack]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (event && event.target) {
        if (
          open &&
          drawerOverlayRef?.current?.contains(event.target as Node) &&
          !drawerWrapperRef?.current?.contains(event.target as Node)
        ) {
          handleClose();
        }
      }
    },
    [open, drawerOverlayRef, drawerWrapperRef, handleClose]
  );

  useEffect(() => {
    if (open && typeof document !== "undefined") {
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
          color="neutral"
          appearance="text"
          name={position === "left" ? "arrow_back" : "arrow_forward"}
          className="drawer-back-button"
          onClick={handleBack}
        />
      ),
    [handleBack, position]
  );

  const close = useMemo(
    () => (
      <IconButton
        type="button"
        color="neutral"
        appearance="text"
        name="close"
        className="drawer-close-button"
        onClick={handleClose}
      />
    ),
    [handleClose]
  );

  const drawer = (
    <div
      ref={drawerWrapperRef}
      className={clsx("drawer-wrapper", className, {
        [position]: true,
        closing,
      })}
      {...props}
    >
      {close || back ? (
        <div className="drawer-controls">
          {back}
          {close}
        </div>
      ) : null}

      {children}
    </div>
  );

  const drawerOverlay = (
    <div
      className={clsx(
        "drawer-overlay",
        { "fusion-ui": portal },
        overlayClassName
      )}
      ref={drawerOverlayRef}
    >
      {drawer}
    </div>
  );

  const container = document.getElementById("root") || document.body;
  console.log("portal", open);
  return (
    open &&
    (portal
      ? ReactDOM.createPortal(drawerOverlay, container as Element)
      : drawerOverlay)
  );
};

export default Drawer;
