import React, {useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';

export {default as NotificationHeader} from './notificationHeader';
export {default as NotificationBody} from './notificationBody';
export {default as NotificationFooter} from './notificationFooter';

interface INotification {
  /**
   * Tell whether you want the close icon or not
   */
  icon?: any;
  /**
   * Additional styling if needed
   */
  className?: string;
  /**
   * Change status to Success
   */
  success?: boolean;
  /**
   * Change status to Error
   */
  error?: boolean;
  /**
   * Change status to Info
   */
  info?: boolean;
  /**
   * Change status to Warning
   */
  warning?: boolean;
  /**
   * Change status to Read
   */
  read?: boolean;
  /**
   * State for showing the notification
   */
  show: boolean;
  setShow?: (show: boolean) => void;
  /**
   * handler function for the close button
   */
  onClose?: () => void;
  /**
   * Handler to show or not as a portal
   */
  renderAsPortal?: boolean;
  [others: string]: any;
}

const Notification: React.FC<INotification> = (props) => {
  const {className, renderAsPortal, icon, children, onClose, success, error, warning, info, read, show, setShow, ...rest} =
    props;

  const iconTestId = rest && rest['data-testid'] ? rest['data-testid'] + '-close-test' : undefined;
  const closeTimer: any = useRef(null);
  const state = () => {
    if (success) return 'success';
    if (error) return 'error';
    if (info) return 'info';
    if (warning) return 'warning';
    if (read) return 'read';
    return 'read';
  };

  useEffect(() => {
    if (show && renderAsPortal && !onClose) {
      clearTimeout(closeTimer.current);
      closeTimer.current = setTimeout(() => {
        if (typeof setShow === 'function') setShow(false);
      }, 5000);
    }

    return () => clearTimeout(closeTimer.current);
  }, [show]);

  const IconClose = () => (
    <button type="button" className="notification-close-button" onClick={onClose} data-testid={iconTestId || undefined}>
      <span className="material-icons">close</span>
    </button>
  );
  const content = show ? (
    <div className={`${renderAsPortal ? 'tag-ds' : ''} notification_${state()} ${className || ''}`} {...rest}>
      {typeof onClose === 'function' && <IconClose />}
      {icon ? (
        <>
          <div className="notification-icon">{icon}</div>
          <div className="notification-content">{children}</div>
        </>
      ) : (
        children
      )}
    </div>
  ) : null;

  const container = document.getElementById('root') || document.body;
  if (renderAsPortal) return ReactDOM.createPortal(content, container as Element);
  return content;
};

export default Notification;
