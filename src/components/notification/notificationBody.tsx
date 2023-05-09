import React from 'react';

interface INotificationBody {
  className?: string;
  [others: string]: any;
}

const NotificationBody: React.FC<INotificationBody> = (props) => {
  const {className, children, ...rest} = props;

  return (
    <div className={`notification-body ${className || ''}`} {...rest}>
      {children}
    </div>
  );
};

export default NotificationBody;
