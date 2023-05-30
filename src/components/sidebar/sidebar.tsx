import React, {useContext, useEffect, useState} from 'react';
import SidebarLogo from './sidebarLogo';
export {default as SidebarLogo} from './sidebarLogo';
export {default as SidebarButton} from './sidebarButton';
export {default as SidebarDivider} from './sidebarDivider';
const SidebarContext = React.createContext({});
export interface ISidebarProps {
  /**
   * Identifies the sidebar component
   */
  id?: string;
  /**
   * Change mode for sidebar in collapsed mode
   */
  collapsed?: boolean;
  /**
   * Set the default item selected, is an id of the sidebar item selected
   */
  defaultItemSelected?: string;
  /**
   * Function when item is clicked
   */
  onClickSidebarItem?: (itemId: string) => void;
  /**
   * Add class to sidebar
   */
  className?: string;
  /**
   * Callback for when the sidebar is collapsed
   */
  onCollapse?: (collapsed: boolean) => void;
  [others: string]: any;
}

interface ISidebarContext {
  collapsed: boolean;
  selected: string;
  onClickItem: (e: React.MouseEvent) => void;
}

const Sidebar: React.FC<ISidebarProps> = ({
  id,
  collapsed,
  children,
  defaultItemSelected,
  className,
  onClickSidebarItem,
  onCollapse,
  ...rest
}) => {
  const [isCollapsed, setCollapsed] = useState(collapsed);
  const [itemSelected, setItemSelected] = useState(defaultItemSelected);

  useEffect(() => {
    if (defaultItemSelected && defaultItemSelected !== itemSelected) setItemSelected(defaultItemSelected);
  }, [defaultItemSelected, itemSelected]);

  const handleCollapse = () => {
    if (typeof onCollapse === 'function') onCollapse(!isCollapsed);
    setCollapsed(!isCollapsed);
  };

  const renderSidebarLogo = () => {
    if (children && (children as any).length) {
      const _sidebarLogo = (children as any).find((a: any) => a && a.type === SidebarLogo);
      if (_sidebarLogo) {
        return _sidebarLogo;
      }
    }
    return null;
  };

  const renderSidebarChilds = () => {
    const _sidebarChilds: any[] = [];
    if (children) {
      if ((children as any).length) {
        (children as any).forEach((child: any) => {
          if (child) {
            if (child.type !== SidebarLogo) {
              _sidebarChilds.push(child);
            }
          }
        });
      } else if ((children as any).type !== SidebarLogo) {
        _sidebarChilds.push(children);
      }
    }
    return _sidebarChilds;
  };

  const onClickItem = (e: React.MouseEvent<any>) => {
    const _id = e.currentTarget.id;
    setItemSelected(_id);
    if (typeof onClickSidebarItem === 'function') {
      e.preventDefault();
      onClickSidebarItem(_id);
    }
  };

  return (
    <SidebarContext.Provider value={{collapsed: isCollapsed, selected: itemSelected, onClickItem}}>
      <div id={id} className={`sidebar${isCollapsed ? '_collapsed' : ''} ${className || ''}`} {...rest}>
        {renderSidebarLogo()}
        <button
          type="button"
          data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-collapsed-btn` : undefined}
          className="sidebar-collapsed-button"
          onClick={handleCollapse}
          key="sidebar-collapsed-btn"
        >
          <span className="material-icons">{isCollapsed ? 'menu' : 'menu_open'}</span>
        </button>
        {renderSidebarChilds()}
      </div>
    </SidebarContext.Provider>
  );
};
export default Sidebar;
/**
 *
 * @internal
 */
export const useSidebar = () => useContext(SidebarContext) as ISidebarContext;
