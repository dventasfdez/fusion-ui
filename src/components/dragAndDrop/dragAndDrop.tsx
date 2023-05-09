import React, {useRef, useEffect} from 'react';

interface IDragAndDropProps {
  disabled?: boolean;
  handleDrop?: (e: any) => void;
  onClick?: () => void;
  className?: string;
  [others: string]: any;
}

const DragAndDrop: React.FC<IDragAndDropProps> = (props) => {
  const {disabled, children, className, onClick, ...rest} = props;
  const dropRef = useRef<HTMLDivElement>(null);

  const handleDrag = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOut = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && e?.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      if (typeof props.handleDrop === 'function') props.handleDrop(e.dataTransfer.files);
      if (e?.dataTransfer?.items) {
        e.dataTransfer.items.clear();
      } else if (typeof e?.dataTransfer?.clearData === 'function') {
        e.dataTransfer.clearData();
      }
    }
  };

  useEffect(() => {
    const divRender = dropRef.current;
    if (!divRender) return;
    divRender.addEventListener('dragenter', handleDragIn);
    divRender.addEventListener('dragleave', handleDragOut);
    divRender.addEventListener('dragover', handleDrag);
    divRender.addEventListener('drop', handleDrop);
    return () => {
      if (!divRender) return;
      divRender.removeEventListener('dragenter', handleDragIn);
      divRender.removeEventListener('dragleave', handleDragOut);
      divRender.removeEventListener('dragover', handleDrag);
      divRender.removeEventListener('drop', handleDrop);
    };
  });

  return (
    <div
      data-testid={rest['data-testid'] ? rest['data-testid'] : undefined}
      className={`drag-drop ${className}`}
      style={{display: 'inline-block', position: 'relative', width: '100%'}}
      ref={dropRef}
      onClick={() => {
        if (!disabled && typeof onClick === 'function') onClick();
      }}
    >
      {children}
    </div>
  );
};
export default DragAndDrop;
