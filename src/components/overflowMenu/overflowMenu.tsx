import React, {useEffect, useRef} from 'react';

export interface IOverflowMenuProps {
  show: boolean;
  /**
   * Title of the Overflow Menu
   */
  title: string;
  /**
   * Name of the action if needed
   */
  action?: string;
  /**
   * Displays close button and handles the event
   */
  onClose: () => void;
  showCloseButton?: boolean;
  /**
   * Handler for the action Button
   */
  onAction?: () => void;
  className?: string;
  parentRef?: any;
  [other: string]: any;
}

const OverflowMenu: React.FC<IOverflowMenuProps> = ({
  show,
  children,
  title,
  action,
  onClose,
  showCloseButton,
  onAction,
  className,
  parentRef,
  ...rest
}) => {
  const overflowRef = useRef<HTMLDivElement>(null);
  const handleCloseOutsideOverflow = (event: MouseEvent) => {
    if (event && event.target) {
      if (
        ((overflowRef && overflowRef.current && !overflowRef.current.contains(event.target as Node) && !parentRef) ||
          (overflowRef &&
            overflowRef.current &&
            !overflowRef.current.contains(event.target as Node) &&
            parentRef &&
            parentRef.current &&
            !parentRef.current.contains(event.target as Node))) &&
        show
      ) {
        onClose();
      }
    }
  };

  useEffect(() => {
    if (!showCloseButton && !(rest && rest['data-handlecloseclick'])) {
      document.addEventListener('mousemove', handleCloseOutsideOverflow);
    } else {
      document.addEventListener('click', handleCloseOutsideOverflow);
    }
    return () => {
      document.removeEventListener('mousemove', handleCloseOutsideOverflow);
      document.removeEventListener('click', handleCloseOutsideOverflow);
    };
  });
  return show ? (
    <div
      ref={overflowRef}
      className={`overflow-menu ${className || ''}`}
      data-testid={rest['data-testid'] ? rest['data-testid'] : undefined}
      {...rest}
    >
      <div className="overflow-menu-header">
        {title && <div className="small-title mr3">{title}</div>}
        {action && (
          <div
            className="overflow-menu-action link_small"
            onClick={onAction}
            data-testid={rest['data-testid'] ? rest['data-testid'] + '-action-button' : undefined}
          >
            {action}
          </div>
        )}

        {showCloseButton && (
          <button
            type="button"
            className="overflow-menu-close"
            onClick={onClose}
            data-testid={rest['data-testid'] ? rest['data-testid'] + '-close-button' : undefined}
          >
            <span className="material-icons">close</span>
          </button>
        )}
      </div>
      <div className="overflow-menu-body">{children}</div>
    </div>
  ) : null;
};

export default OverflowMenu;
