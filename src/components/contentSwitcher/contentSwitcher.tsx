import React, {useEffect, useState} from 'react';
import ContentSwitcherItem from './contentSwitcherItem';

export {default as ContentSwitcherItem} from './contentSwitcherItem';

export interface IContentSwitcherProps {
  /**
   * Indicates the active tab when the component is rendered
   */
  defaultActiveItem?: string;
  onChangeItem?: (id: string) => void;
  divider?: boolean;
  small?: boolean;
  className?: string;
  [others: string]: any;
}

const ContentSwitcher: React.FC<IContentSwitcherProps> = (props) => {
  const {small, divider, defaultActiveItem, className, children, onChangeItem, ...rest} = props;
  const [activeItem, setActiveItem] = useState<string>(defaultActiveItem ? defaultActiveItem : '');

  useEffect(() => {
    if (defaultActiveItem !== activeItem) setActiveItem(defaultActiveItem || '');
  }, [defaultActiveItem]);

  const onClickContentSwitcherItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    const _id = e.currentTarget.id;
    setActiveItem(_id);
    if (typeof onChangeItem === 'function') onChangeItem(_id);
  };

  const renderList = () => {
    const _list: any = [];
    if (children) {
      React.Children.forEach(children, (_child: any, index: number) => {
        if (_child && _child.type === ContentSwitcherItem) {
          if (!activeItem && index === 0) {
            setActiveItem(_child.props?.id);
          }
          _list.push(
            <button
              type="button"
              data-testid={_child.props && _child.props['data-testid'] ? `${_child.props['data-testid']}` : undefined}
              id={`${_child.props?.id}`}
              key={`${_child.props?.id}`}
              className={`content-switcher-item-button ${
                activeItem === _child.props?.id || (!activeItem && index === 0) ? 'active' : ''
              }`}
              onClick={onClickContentSwitcherItem}
              disabled={_child.props && _child.props?.disabled}
            >
              {_child.props && _child.props.icon && <span className="content-switcher-item-icon">{_child.props.icon}</span>}
              <span className="content-switcher-item-title">{_child.props?.title}</span>
              {_child.props && typeof _child.props.badge === 'number' && (
                <span className={small ? 'badge_empty' : 'badge'}>{!small && _child.props.badge}</span>
              )}
            </button>
          );
        }
      });
    }

    return <div className={`content-switcher-items${small ? '_small' : ''}${divider ? '_divider' : ''}`}>{_list}</div>;
  };

  const renderContent = () => {
    let _content;
    if (children) {
      _content = React.Children.map(children, (_child: any, index: number) => {
        const _childClone = React.cloneElement(_child, {
          'data-testid': _child.props && _child.props['data-testid'] ? `${_child.props['data-testid']}-content` : undefined,
          id: `${_child.props.id}-content`,
          key: `${_child.props.id}-content`,
          active: activeItem === _child.props.id || (!activeItem && index === 0),
        });
        return _childClone;
      });
    }
    return _content;
  };

  return (
    <div className={`content-switcher ${className || ''}`} {...rest}>
      {renderList()}
      {renderContent()}
    </div>
  );
};

export default ContentSwitcher;
