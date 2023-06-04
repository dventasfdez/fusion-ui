import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

export { default as ModalHeader } from "./modalHeader";
export { default as ModalBody } from "./modalBody";
export { default as ModalFooter } from "./modalFooter";

export interface IModalProps {
  className?: string;
  wrapperClassName?: string;
  onClose?: () => void;
  open?: boolean;
  renderAsPortal?: boolean;
  [others: string]: any;
}

const Modal: React.FC<IModalProps> = (props) => {
  const { className, onClose, children, open, renderAsPortal, wrapperClassName, ...rest } = props;

  const modalRef = useRef<HTMLDivElement>(null);
  const [boundings, setBoundings] = useState<DOMRect | undefined>(undefined);

  const iconClose = (
    <button type="button" data-testid={rest && rest["data-testid"] ? `${rest["data-testid"]}-icon-close` : undefined} className="modal-close-button" onClick={onClose}>
      <span className="material-icons">close</span>
    </button>
  );

  const setBoundingsRect = () => {
    if (modalRef && modalRef.current && renderAsPortal && open) {
      const rect = modalRef.current.getBoundingClientRect();
      if (boundings?.width !== rect?.width || boundings?.height !== rect?.height) {
        setBoundings(modalRef.current?.getBoundingClientRect());
      }
    }
  };

  useEffect(() => {
    window.addEventListener("resize", setBoundingsRect);
    window.addEventListener("orientationchange", setBoundingsRect);
    return () => {
      window.removeEventListener("resize", setBoundingsRect);
      window.removeEventListener("orientationchange", setBoundingsRect);
    };
  });

  useEffect(() => {
    setBoundingsRect();
  }, [modalRef.current?.getBoundingClientRect(), open, renderAsPortal]);

  const renderModal = () => (
    <div
      ref={modalRef}
      className={`modal ${className ?? ""}`}
      {...rest}
      style={renderAsPortal && boundings ? { ...rest["style"], marginTop: `-${boundings.height / 2}px`, marginLeft: `-${boundings.width / 2}px` } : undefined}
    >
      {typeof onClose === "function" && iconClose}
      {children}
    </div>
  );
  const content = <div className={`stepone-ui modal-wrapper ${wrapperClassName || ""}`}>{renderModal()}</div>;

  if (renderAsPortal && typeof document !== "undefined") {
    const container = document.getElementById("root") || document.body;
    return open ? ReactDOM.createPortal(content, container as Element) : null;
  }

  return renderModal();
};

export default Modal;
