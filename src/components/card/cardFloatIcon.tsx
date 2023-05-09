import React from 'react';
export interface ICardFloatIconProps {
  /**
   * Identifies the accordion item
   */
  id?: string;
  /**
   * Add class to accordion
   */
  className?: string;
  [others: string]: any;
}

const CardFloatIcon: React.FC<ICardFloatIconProps> = (props) => {
  const {id, children, className, ...rest} = props;

  const renderFloatIcon = () => {
    if (children) {
      const _child: any = React.Children.toArray(children)[0];
      let _renderChild: any;
      let _clasNameProps = '';
      if (_child) {
        if (_child.props && _child.props.className) _clasNameProps = _child.props.className;
        _renderChild = React.cloneElement(_child, {
          ..._child.props,
          id: id,
          className: `card-float-icon ${_clasNameProps || ''} ${className || ''}`,
          ...rest,
        });
        return _renderChild;
      }
    }

    return <></>;
  };

  return renderFloatIcon();
};

export default CardFloatIcon;
