import React from 'react';
import FooterHeader from './footerHeader';
import FooterBottom from './footerBottom';
import FooterLogo from './footerLogo';
import FooterBrand from './footerBrand';

export {default as FooterHeader} from './footerHeader';
export {default as FooterBottom} from './footerBottom';
export {default as FooterLogo} from './footerLogo';
export {default as FooterBrand} from './footerBrand';
export interface IFooterProps {
  /**
   * Adds class to the footer component
   */
  className?: string;
  children:
    | React.ReactComponentElement<typeof FooterHeader | typeof FooterBottom | typeof FooterLogo | typeof FooterBrand>[]
    | React.ReactComponentElement<typeof FooterHeader | typeof FooterBottom | typeof FooterLogo | typeof FooterBrand>;
  [others: string]: any;
}

const Footer: React.FC<IFooterProps> = (props) => {
  const {className, children, ...rest} = props;

  const renderFooter = () => {
    let contentFooterHeader: any = null;
    let contentFooterBottom: any = null;

    if (children) {
      const _child = children;
      React.Children.forEach(_child, (_childItem: any) => {
        if (_childItem.type === FooterHeader) {
          contentFooterHeader = _childItem;
        } else contentFooterBottom = _childItem;
      });
    }

    const header = contentFooterHeader;
    const bottom = contentFooterBottom;

    return (
      <div
        className={`footer-container ${className || ''}`}
        data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}` : undefined}
        {...rest}
      >
        {header}
        {header && bottom && <hr className="mt4 mb4" />}
        {bottom}
      </div>
    );
  };

  return renderFooter();
};

export default Footer;
