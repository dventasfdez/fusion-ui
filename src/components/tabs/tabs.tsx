import React, {useEffect, useState} from 'react';
import TabItem from './tabItem';
import Dropdown, {DropdownButton, DropdownMenu} from '../dropdown/dropdown';
import {useDevice} from '../../hooks/useDevice/useDevice';

export {default as TabItem} from './tabItem';
export interface ITabsProps {
  /**
   * Change horizontal for vertical allignment
   */
  vertical?: boolean;
  /**
   * Indicates the active tab when the component is rendered
   */
  defaultActiveTab?: string;
  onChangeTab?: (_id: string) => void;
  className?: string;
  [others: string]: any;
}

const Tabs: React.FC<ITabsProps> = ({defaultActiveTab, vertical, children, className, onChangeTab, ...rest}) => {
  const {isMobile} = useDevice();
  const [activeTab, setActiveTab] = useState<string>(defaultActiveTab ? defaultActiveTab : '');

  useEffect(() => {
    if (defaultActiveTab && defaultActiveTab !== activeTab) setActiveTab(defaultActiveTab);
  }, [defaultActiveTab]);

  const onClickTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    const _id = e.currentTarget.id;
    setActiveTab(_id);
    if (typeof onChangeTab === 'function') onChangeTab(_id);
  };

  const renderList = () => {
    let _list: any = [];
    let _dropdownMenu: any = [];
    let itemsCollapsed = 0;
    if (children) {
      if (React.Children.toArray(children).length > 1) {
        React.Children.forEach(children, (_child: any, index: number) => {
          if (_child && _child.type === TabItem) {
            const {id, disabled, title, collapsed, ...rest} = _child.props;
            if (((!isMobile && index - itemsCollapsed <= 5) || (isMobile && index - itemsCollapsed < 3)) && !collapsed) {
              _list.push(
                <button
                  type="button"
                  {...rest}
                  id={id}
                  key={`${id}-key`}
                  disabled={disabled}
                  onClick={onClickTab}
                  className={`tab-list-item ${activeTab === id || (!activeTab && index === 0) ? 'active' : ''}`}
                >
                  {title}
                </button>
              );
            } else {
              itemsCollapsed++;
              _dropdownMenu.push(
                <button
                  type="button"
                  {...rest}
                  id={id}
                  key={`${id}-key`}
                  disabled={disabled}
                  onClick={onClickTab}
                  className={`dropdown-item tab-list-item ${
                    activeTab === id || (!activeTab && index === 1) ? 'active' : ''
                  }`}
                >
                  {title}
                </button>
              );
            }
          }
        });
      } else {
        const _uniqueChild = children as any;
        if (_uniqueChild && _uniqueChild.type === TabItem) {
          const {title, id, disabled, ...rest} = _uniqueChild.props;
          if (!_uniqueChild.props?.collapsed) {
            _list = (
              <button
                {...rest}
                type="button"
                id={id}
                key={`${id}-key`}
                disabled={disabled}
                onClick={onClickTab}
                className="tab-list-item active"
              >
                {title}
              </button>
            );
          } else {
            _dropdownMenu = (
              <button
                {...rest}
                type="button"
                id={id}
                key={`${id}-key`}
                disabled={disabled}
                onClick={onClickTab}
                className="dropdown-item tab-list-item active"
              >
                {title}
              </button>
            );
          }
        }
      }
    }

    if (_dropdownMenu && _dropdownMenu.length) {
      _list.push(renderDropdown(_dropdownMenu, _list.length - 1));
    }

    return <div className="tab-list">{_list}</div>;
  };

  const renderDropdown = (menu: any, listLenght: number) => {
    const _disabledElements = (menu as any[]).filter((_element: any) => _element.props?.disabled);
    const _activeElements = (menu as any[]).filter((_element: any) => {
      const _classes = _element.props?.className.split(' ');
      if (_classes[_classes.length - 1] === 'active') return true;
      return false;
    });

    return (
      <Dropdown key={'dropdown-' + listLenght} itemsDivider={!vertical}>
        <DropdownButton disabled={_disabledElements.length === menu.length}>
          <button type="button" className={_activeElements.length ? 'active' : ''}>
            <span className="material-icons">more_vert</span>
          </button>
        </DropdownButton>
        <DropdownMenu>{menu}</DropdownMenu>
      </Dropdown>
    );
  };

  const renderContent = () => {
    let _content;
    if (children) {
      if (React.Children.toArray(children).length > 1) {
        _content = React.Children.map(children, (_child: any, index: number) => {
          const _childClone = React.cloneElement(_child, {
            activeTab: activeTab === _child.props?.id || (!activeTab && index === 0),
          });
          return _childClone;
        });
      } else {
        const _uniqueChild = children as any;
        if (_uniqueChild.type === TabItem) {
          const _uniqueChildClone = React.cloneElement(_uniqueChild, {
            activeTab: true,
          });
          _content = _uniqueChildClone;
        }
      }
    }
    return _content;
  };

  return (
    <div className={`${vertical ? 'tabs-vertical' : 'tabs'} ${className || ''}`} {...rest}>
      {renderList()}
      {renderContent()}
    </div>
  );
};

export default Tabs;
