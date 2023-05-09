import React from 'react';
import {ICookieCommonProps} from './cookieMessage';

const CookieMessageHeader: React.FC<ICookieCommonProps> = ({children, className, ...rest}) => (
  <h4 className={className || ''} {...rest}>
    {children}
  </h4>
);

export default CookieMessageHeader;
