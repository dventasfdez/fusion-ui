import React, {useRef} from 'react';
import Dropdown, {DropdownButton, DropdownMenu} from '../dropdown/dropdown';
import Notification, {NotificationBody, NotificationFooter, NotificationHeader} from '../notification/notification';
import OverflowMenu from '../overflowMenu/overflowMenu';
import Avatar from '../avatar/avatar';
type NotificationType = 'error' | 'info' | 'read' | 'warning';

export interface INotification {
  header: string;
  body: string;
  footer?: string;
  type: NotificationType;
  show?: boolean;
  created?: Date;
  icon?: any;
}

interface IUpperMenu {
  /**
   * For setting the Avatar info
   */
  avatar: React.ReactComponentElement<typeof Avatar>;
  /**
   * Title of the Upper Menu
   */
  title?: string;
  /**
   * Notification List containing header, body, footer, type, show and created and actions in
   * the overflow menu of notifications
   */
  notifications?: {
    setShowItems: () => void;
    onAction?: () => void;
    action?: string;
    emptyMessage?: string;
    title: string;
    items: INotification[];
    showItems: boolean;
    showCloseButton?: boolean;
  };
  /**
   * Options of the Upper Menu
   */
  options?: {name: React.ReactNode; onClick: () => void}[];
  className?: string;
  [others: string]: any;
}

const UpperMenu: React.FC<IUpperMenu> = (props: IUpperMenu) => {
  const {avatar, title, notifications, options, className, ...rest} = props;
  const notifButtonRef = useRef<HTMLButtonElement>(null);

  const notificationType = (type: NotificationType) => {
    if (type === 'error') return {error: true};
    if (type === 'info') return {info: true};
    if (type === 'read') return {read: true};
    if (type === 'warning') return {warning: true};
    return {info: true};
  };

  const renderNotification = (_notification: INotification, idx: number) => {
    return (
      <Notification
        {...notificationType(_notification.type)}
        className="upper-menu-overflow-notification"
        show={_notification.show ?? true}
        key={`upper-menu-notification-${idx}`}
        icon={_notification.icon}
      >
        {_notification.header && (
          <NotificationHeader>
            {_notification.header}
            {_notification.created && (
              <span className="notification-center-text">{_notification.created.getSeconds()}s</span>
            )}
          </NotificationHeader>
        )}
        {_notification.body && <NotificationBody>{_notification.body}</NotificationBody>}
        {_notification.footer && <NotificationFooter>{_notification.footer}</NotificationFooter>}
      </Notification>
    );
  };

  return (
    <div
      className={`upper-menu ${className || ''}`}
      data-testid={rest && rest['data-testid'] ? rest['data-testid'] : undefined}
    >
      {title && (
        <div
          className="upper-menu_left"
          data-testid={rest && rest['data-testid'] ? rest['data-testid'] + '-title' : undefined}
        >
          {title}
        </div>
      )}
      <div className="upper-menu_right">
        {notifications && (
          <div className="upper-menu-notifications">
            <button
              type="button"
              ref={notifButtonRef}
              className="upper-menu-icon"
              onClick={notifications.setShowItems}
              data-testid={rest && rest['data-testid'] ? rest['data-testid'] + '-notif-icon' : undefined}
            >
              {notifications.items.length > 0 && <div className="badge_small">{notifications.items.length}</div>}
              <span className="material-icons">notifications</span>
            </button>
            <OverflowMenu
              show={notifications.showItems}
              className="upper-menu-overflow notification-center"
              title={notifications.title}
              onClose={notifications.setShowItems}
              action={notifications.action}
              onAction={notifications.onAction}
              parentRef={notifButtonRef}
            >
              {notifications.items.length > 0
                ? notifications.items.map((_not: INotification, idx) => renderNotification(_not, idx))
                : notifications.emptyMessage}
            </OverflowMenu>
          </div>
        )}
        {avatar}
        {options && options.length > 0 && (
          <Dropdown className="upper-menu-dropdown">
            <DropdownButton>
              <button
                type="button"
                className="upper-menu-info"
                data-testid={rest && rest['data-testid'] ? rest['data-testid'] + '-more-info' : undefined}
              >
                <span className="material-icons">more_vert</span>
              </button>
            </DropdownButton>
            <DropdownMenu>
              {options.map(({name, onClick}, idx) => (
                <li className="dropdown-item" onClick={onClick} key={idx + '-upper-menu-dropdown'}>
                  {name}
                </li>
              ))}
            </DropdownMenu>
          </Dropdown>
        )}
      </div>
    </div>
  );
};
export default UpperMenu;
