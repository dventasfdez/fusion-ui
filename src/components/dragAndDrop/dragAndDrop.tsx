import React, { useRef, useEffect, HTMLAttributes } from "react";

type DragAndDropProps = HTMLAttributes<HTMLDivElement> & {
  disabled?: boolean;
  handleDrop?: (e: DragEvent) => void;
};

const DragAndDrop: React.FC<DragAndDropProps> = ({
  disabled,
  children,
  onClick,
  handleDrop,
  ...props
}) => {
  const dropRef = useRef<HTMLDivElement>(null);

  const handleDragOverEvent = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnterEvent = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeaveEvent = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDropEvent = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      !disabled &&
      e?.dataTransfer?.files &&
      e.dataTransfer.files.length > 0
    ) {
      handleDrop?.(e);
      if (e?.dataTransfer?.items) {
        e.dataTransfer.items.clear();
      } else if (typeof e?.dataTransfer?.clearData === "function") {
        e.dataTransfer.clearData();
      }
    }
  };

  useEffect(() => {
    const divRender = dropRef.current;
    if (!divRender) return;
    divRender.addEventListener("dragenter", handleDragEnterEvent);
    divRender.addEventListener("dragleave", handleDragLeaveEvent);
    divRender.addEventListener("dragover", handleDragOverEvent);
    divRender.addEventListener("drop", handleDropEvent);
    return () => {
      if (!divRender) return;
      divRender.removeEventListener("dragenter", handleDragEnterEvent);
      divRender.removeEventListener("dragleave", handleDragLeaveEvent);
      divRender.removeEventListener("dragover", handleDragOverEvent);
      divRender.removeEventListener("drop", handleDropEvent);
    };
  });

  return (
    <div
      ref={dropRef}
      onClick={!disabled ? onClick : undefined}
      data-disabled={disabled}
      {...props}
    >
      {children}
    </div>
  );
};
export default DragAndDrop;
