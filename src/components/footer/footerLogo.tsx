import React from 'react';

export interface IFooterLogoProps {
  /**
   * Adds classname to the logo
   * */
  className?: string;
  [others: string]: any;
}

const FooterLogo: React.FC<IFooterLogoProps> = (props) => {
  const {children, className, ...rest} = props;

  const renderLogo = () => {
    if (children) {
      const _child = children as any;
      let _classNameChild = '';
      if (_child.props && _child.props.className) _classNameChild = _child.props.className;
      const _childClone = React.cloneElement(_child, {
        ..._child.props,
        ...rest,
        className: `footer-logo ${_classNameChild || ''} ${className || ''}`,
      });
      return _childClone;
    }
    return null;
  };
  return renderLogo();
};

export default FooterLogo;
