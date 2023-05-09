import React from 'react';
import {ICookieCommonProps} from './cookieMessage';

const CookieMoreInfo: React.FC<ICookieCommonProps> = ({children, className, ...rest}) => {
  return (
    <div className={className || ''} {...rest}>
      {children}
    </div>
  );
};

export default CookieMoreInfo;
