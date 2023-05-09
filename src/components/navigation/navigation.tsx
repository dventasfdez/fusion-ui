import React, {useState} from 'react';
import TabItem, {ITabItemProps} from '../tabs/tabItem';
import Tabs from '../tabs/tabs';
import NavigationLogo from './navigationLogo';
import NavigationSearch from './navigationSearch';
import {useDevice} from '../../hooks/useDevice/useDevice';
import Dropdown, {DropdownButton, DropdownMenu} from '../dropdown/dropdown';
import Select, {Option} from '../select/select';
import Accordion, {AccordionContent, AccordionHeader} from '../accordion/accordion';

interface INavigation {
  className?: string;
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [others: string]: any;
}

export const NavigationAreas = Tabs;
export const NavigationArea = TabItem;
export const NavigationLanguages = Select;
export const NavigationLanguage = Option;

const Navigation: React.FC<INavigation> = ({className, children, ...rest}) => {
  const {isMobile} = useDevice();
  const [areaSelected, setAreaSelected] = useState('');

  const onToggleArea = (id: string) => setAreaSelected(id);

  const renderNav = () => {
    let areaShown: any = null;
    let _logo: any = null,
      _search: any = null;
    const _newChildren: any = React.Children.map(children, (_child) => {
      if ((_child as any).type === Tabs)
        return React.cloneElement(
          _child as any,
          {
            ...(_child as any).props,
            onChangeTab: (_id: string) => {
              if (typeof (_child as any)?.props?.onChangeTab === 'function') (_child as any).props.onChangeTab(_id);
              onToggleArea(_id);
            },
          },
          React.Children.map((_child as any).props.children, (_child2, idx) => {
            if (_child2.type === TabItem) {
              if (areaSelected === _child2.props.id || idx === 0)
                areaShown = (
                  <div className="navigation-bottom">
                    {_logo}
                    {_child2.props.children}
                    {_search}
                  </div>
                );
              return <TabItem {..._child2.props} />;
            }
            return _child2;
          })
        );
      else if ((_child as any).type === NavigationLogo) {
        _logo = _child;
        _search = null;
        return true;
      } else if ((_child as any).type === NavigationSearch) {
        _search = _child;
        return true;
      }
      return _child;
    });

    return [_newChildren, areaShown];
  };

  const renderNavMobile = () => {
    let _logo = null,
      _language = null,
      _areas = null,
      _search = null;

    React.Children.forEach(children, (_childM) => {
      if ((_childM as any).type === NavigationLogo) _logo = _childM;
      else if ((_childM as any).type === NavigationLanguages) {
        _language = _childM;
      } else if ((_childM as any).type === NavigationAreas) {
        const _items = (_childM as any).props.children;
        if (_items && _items.length > 0) {
          _areas = (
            <div className="accordion-group">
              {React.Children.map(_items, (_itemChild) => {
                const _props = _itemChild.props as ITabItemProps;
                return (
                  <Accordion>
                    <AccordionHeader>{_props.title}</AccordionHeader>
                    <AccordionContent>{_itemChild.props.children}</AccordionContent>
                  </Accordion>
                );
              })}
            </div>
          );
        }
      } else if ((_childM as any).type === NavigationSearch) {
        _search = _childM;
      }
    });

    return (
      <>
        {_logo}
        <Dropdown className="navigation-menu" keepShown>
          <DropdownButton>
            <button className="button-interactive">
              <span className="material-icons">menu</span>
            </button>
          </DropdownButton>
          <DropdownMenu>
            {_search}
            {_language}
            {_areas}
          </DropdownMenu>
        </Dropdown>
      </>
    );
  };
  return (
    <div className={`navigation ${className || ''}`} {...rest}>
      {isMobile ? renderNavMobile() : renderNav()}
    </div>
  );
};
export default Navigation;
