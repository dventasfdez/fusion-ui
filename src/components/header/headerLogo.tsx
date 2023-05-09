import React from 'react';

export interface IHeaderLogoProps {
  className?: string;
  [others: string]: any;
}

const HeaderLogo: React.FC<IHeaderLogoProps> = (props) => {
  const {className, children, ...rest} = props;
  let _children: any = null;
  if (children) {
    _children = React.cloneElement(children as any, {
      ...(children as any).props,
      ...rest,
      className: `header-logo ${(children as any).props.className || ''} ${className || ''}`,
    });
  }
  return _children;
};

export default HeaderLogo;
