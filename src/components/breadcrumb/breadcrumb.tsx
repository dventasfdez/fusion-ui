import React from "react";
import BreadcrumbItem from "./breadcrumbItem";
import Dropdown, { DropdownButton, DropdownMenu } from "../dropdown/dropdown";

export { default as BreadcrumbItem } from "./breadcrumbItem";
export interface IBreadcrumbProps {
  id?: string;
  className?: string;
  [others: string]: any;
}

const Breadcrumb: React.FC<IBreadcrumbProps> = ({ id, className, children, ...rest }) => {
  const renderDropdown = (menu: any) => {
    return (
      <Dropdown key="breadcrumb-dropdown" data-testid={`${rest["data-testid"] ?? "breadcrumb"}-dropdown`}>
        <DropdownButton className="breadcrumb-dots">
          <span className="material-icons">more_horiz</span>
        </DropdownButton>
        <DropdownMenu>{menu}</DropdownMenu>
      </Dropdown>
    );
  };

  const renderList = () => {
    const breadcrumbItemSeparator = (key: number | string) => <span key={key + "item-separator"} className="breadcrumb-item-separator" />;
    const _breadcrumbItems: any = [];
    const _dropdownMenu: any = [];

    let _content: any = [];

    if (children) {
      const _children = React.Children.toArray(children);
      if (_children?.length) {
        if (_children.length > 4) {
          _children.forEach((_child: any, index: number) => {
            if (index > 0 && index < _children.length - 1) {
              _dropdownMenu.push(
                React.cloneElement(_child, {
                  ..._child.props,
                  className: "dropdown-item",
                })
              );
            } else {
              _breadcrumbItems.push(
                React.cloneElement(_child, {
                  ..._child.props,
                  className: index === _children.length - 1 ? "breadcrumb-item_active" : "breadcrumb-item",
                })
              );
            }
          });
          _content = [_breadcrumbItems[0], renderDropdown(_dropdownMenu), _breadcrumbItems[1]];
        } else {
          _content = _children.map((_childMap: any, index: number) =>
            React.cloneElement(_childMap, {
              ..._childMap.props,
              className: index === _children.length - 1 ? "breadcrumb-item_active" : "breadcrumb-item",
            })
          );
        }
      }
    }

    return (
      <div id={id} className={`breadcrumb-container ${className || ""}`} {...rest}>
        {_content.map((_breadcrumbItem: any, _i: number) => {
          if (_i < _content.length - 1) return [_breadcrumbItem, breadcrumbItemSeparator(_i)];
          return _breadcrumbItem;
        })}
      </div>
    );
  };

  return renderList();
};

export default Breadcrumb;
