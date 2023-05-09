import React from 'react';

interface INotificationHeader {
  className?: string;
  [others: string]: any;
}

const NotificationHeader: React.FC<INotificationHeader> = (props) => {
  const {className, children, ...rest} = props;

  return (
    <div className={`notification-header ${className || ''}`} {...rest}>
      {children}
    </div>
  );
};

export default NotificationHeader;
