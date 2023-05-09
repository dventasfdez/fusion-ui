import React from 'react';

interface INotificationFooter {
  className?: string;
  [others: string]: any;
}

const NotificationFooter: React.FC<INotificationFooter> = (props) => {
  const {className, children, ...rest} = props;

  return (
    <div className={`notification-footer ${className || ''}`} {...rest}>
      {children}
    </div>
  );
};

export default NotificationFooter;
