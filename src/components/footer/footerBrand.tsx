import React from 'react';

export interface IFooterBrandProps {
  /**
   * Adds classname to the brand
   * */
  className?: string;
  [others: string]: any;
}

const FooterBrand: React.FC<IFooterBrandProps> = (props) => {
  const {children, className, ...rest} = props;

  const renderBrand = () => {
    if (children) {
      const _child = children as any;
      let _childClone = null;
      if (typeof _child === 'string') {
        _childClone = (
          <span className="footer-brand" {...rest}>
            {_child}
          </span>
        );
      } else {
        let _classNameChild = '';
        if (_child.props && _child.props.className) _classNameChild = _child.props.className;

        _childClone = React.cloneElement(_child, {
          ..._child.props,
          ...rest,
          className: `footer-brand ${_classNameChild || ''} ${className || ''}`,
        });
      }
      return _childClone;
    }
    return null;
  };
  return renderBrand();
};

export default FooterBrand;
