import React, {useState} from 'react';

export interface ITreeElement {
  /**
   * Name of the Tree Element
   */
  name: string;
  /**
   * For disabling the Tree Element
   */
  disabled?: boolean;
  /**
   * click event on developers needs
   */
  onClick?: (e?: React.MouseEvent) => void;
  /**
   * Alternative className on Tree.Element
   */
  className?: string;
  /**
   * prop for displaying an icon if needed
   */
  icon?: string;
  /**
   * By default left sided arrow, can be passed an oposite side (both will show up if they have children)
   */
  arrow?: 'left' | 'right' | 'none';
  [others: string]: any;
}

const TreeViewElement: React.FC<ITreeElement> = ({
  children,
  name,
  onClick,
  disabled,
  className,
  arrow = 'left',
  icon,
  ...rest
}) => {
  const [showChildren, setShowChildren] = useState<boolean>(false);

  const handleClickElement = (e: React.MouseEvent) => {
    setShowChildren(!showChildren);
    if (typeof onClick === 'function') onClick(e);
  };

  const renderIcon = () => {
    if (icon) return icon;
    if (!icon && arrow === 'left') return 'arrow_right';
    return '';
  };

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        className={`list-icon tree-element ${className || ''}`}
        onClick={handleClickElement}
        {...rest}
      >
        <li className="item-condensed tree-li">
          {children || icon ? (
            <span className="material-icons icon-order">{renderIcon()}</span>
          ) : (
            <span className="icon-order" />
          )}
          {name}
          {arrow === 'right' &&
            children &&
            (showChildren ? (
              <span className="material-icons tree-element-icon-right">keyboard_arrow_up</span>
            ) : (
              <span className="material-icons tree-element-icon-right">keyboard_arrow_down</span>
            ))}
        </li>
      </button>
      {children &&
        showChildren &&
        React.Children.toArray(children).map((_child, _idx) => (
          <div key={_idx} className="tree-element-item">
            {_child}
          </div>
        ))}
    </>
  );
};

export default TreeViewElement;
