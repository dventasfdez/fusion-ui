import React from "react";
export interface ICardFloatIconProps {
  className?: string;
  [others: string]: any;
}

const CardFloatIcon: React.FC<ICardFloatIconProps> = (props) => {
  const { children, className, ...rest } = props;

  const renderFloatIcon = () => {
    if (children) {
      const _child: any = React.Children.toArray(children)[0];
      let _renderChild: any;
      let _clasNameProps = "";
      if (_child) {
        if (_child.props && _child.props.className) _clasNameProps = _child.props.className;
        _renderChild = React.cloneElement(_child, {
          ..._child.props,
          className: `card-float-icon ${_clasNameProps ?? ""} ${className ?? ""}`,
          ...rest,
        });
        return _renderChild;
      }
    }
    return null;
  };

  return renderFloatIcon();
};

export default CardFloatIcon;
