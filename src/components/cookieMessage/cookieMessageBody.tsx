import React from 'react';
import {ICookieCommonProps} from './cookieMessage';

const CookieMessageBody: React.FC<ICookieCommonProps> = ({children, className, ...rest}) => {
  return (
    <div className={`cookie-message-body ${className || ''}`} {...rest}>
      {children}
    </div>
  );
};

export default CookieMessageBody;
