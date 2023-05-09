import React from 'react';
import {ICookieCommonProps} from './cookieMessage';

const CookieMessageFooter: React.FC<ICookieCommonProps> = ({children, className, ...rest}) => (
  <div className={`cookie-message-footer ${className || ''}`} {...rest}>
    {children}
  </div>
);

export default CookieMessageFooter;
