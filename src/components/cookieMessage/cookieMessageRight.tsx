import React from 'react';
import {ICookieCommonProps} from './cookieMessage';

const CookieMessageRight: React.FC<ICookieCommonProps> = ({children, className, ...rest}) => (
  <div className={`cookie-message-right ${className || ''}`} {...rest}>
    {children}
  </div>
);

export default CookieMessageRight;
