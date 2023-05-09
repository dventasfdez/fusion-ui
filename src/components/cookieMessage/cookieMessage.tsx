import React from 'react';
import CookieMessageFooter from './cookieMessageFooter';
import CookieMessageHeader from './cookieMessageHeader';
import CookieMessageBody from './cookieMessageBody';
import CookieMessageRight from './cookieMessageRight';
import CookieMoreInfo from './cookieMoreInfo';
export {default as CookieMessageBody} from './cookieMessageBody';
export {default as CookieMessageFooter} from './cookieMessageFooter';
export {default as CookieMessageHeader} from './cookieMessageHeader';
export {default as CookieMessageRight} from './cookieMessageRight';
export {default as CookieMoreInfo} from './cookieMoreInfo';

export interface ICookieMessageProps {
  /** Extra classes if needed */
  className?: string;
  moreInfo?: boolean;
  onToggleMoreInfo?: () => any;
  [key: string]: any;
}

export interface ICookieCommonProps {
  className?: string;
  [key: string]: any;
}

const CookieMessage: React.FC<ICookieMessageProps> = ({children, className, moreInfo, onToggleMoreInfo, ...rest}) => {
  const reactChildren = React.Children.toArray(children);

  const renderStructuredCookie = () => {
    const header = reactChildren.filter((child: any) => child.type === CookieMessageHeader);
    const body = reactChildren.filter((child: any) => child.type === CookieMessageBody);
    const footer = reactChildren.filter((child: any) => child.type === CookieMessageFooter);
    const right = reactChildren.filter((child: any) => child.type === CookieMessageRight);
    return (
      <div className="cookie-message-container">
        <div>
          {header}
          {body}
          {footer}
        </div>
        <div className="cookie-message-right">{right}</div>
      </div>
    );
  };

  const renderMoreInfo = () => {
    return reactChildren.find((child: any) => child.type === CookieMoreInfo);
  };

  const handleClose = () => {
    if (typeof onToggleMoreInfo === 'function') onToggleMoreInfo();
  };

  return (
    <div className={`cookie-message ${className || ''}`} {...rest}>
      {moreInfo ? (
        <div className="cookie-message-back">
          <button type="button" onClick={handleClose} className="cookie-message-back-button">
            <span className="material-icons">keyboard_backspace</span>
          </button>
          <div className="cookie-message-back-helper">Back</div>
        </div>
      ) : null}
      {renderStructuredCookie()}
      {moreInfo ? renderMoreInfo() : null}
    </div>
  );
};

export default CookieMessage;
