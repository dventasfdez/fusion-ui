import React, {
  Children,
  DetailedHTMLProps,
  HTMLAttributes,
  ReactElement,
  ComponentProps,
} from "react";
import Dropdown, { DropdownButton, DropdownMenu } from "../dropdown/dropdown";
import clsx from "clsx";
import BreadcrumbItem from "./breadcrumbItem";

type BreadcrumbChild = ReactElement<
  ComponentProps<typeof BreadcrumbItem>,
  typeof BreadcrumbItem
>;

type BreadcrumbProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children: BreadcrumbChild | BreadcrumbChild[];
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  className,
  children,
  ...props
}) => {
  const dropdown = (items: BreadcrumbChild[]) => {
    return (
      <Dropdown key="breadcrumb-dropdown">
        <DropdownButton className="button_primary button_text button_small">
          <span className="material-icons">more_horiz</span>
        </DropdownButton>
        <DropdownMenu>{items}</DropdownMenu>
      </Dropdown>
    );
  };

  const separator = (key: number | string) => (
    <span key={key + "item-separator"} className="breadcrumb-separator" />
  );

  const render = () => {
    const _items: BreadcrumbChild[] = Children.toArray(
      children
    ) as BreadcrumbChild[];
    if (_items.length > 4) {
      const _dropdownItems: BreadcrumbChild[] = _items.slice(
        1,
        _items.length - 1
      );
      const _firstItem: BreadcrumbChild = _items[0];
      const _lastItem: BreadcrumbChild = _items[_items.length - 1];
      return [
        _firstItem,
        dropdown(
          _dropdownItems.map((_child) =>
            React.cloneElement(_child, {
              ..._child.props,
              className: "dropdown-item",
            })
          )
        ),
        React.cloneElement(_lastItem, {
          ..._lastItem.props,
          active: true,
        }),
      ];
    }

    return _items.map((_child, index) => {
      if (index < _items.length - 1) {
        return [_child, separator(index)];
      }
      return React.cloneElement(_child, {
        ..._child.props,
        active: index === _items.length - 1,
      });
    });
  };

  return (
    <div className={clsx("breadcrumb-container", className)} {...props}>
      {render()}
    </div>
  );
};

export default Breadcrumb;
export { default as BreadcrumbItem } from "./breadcrumbItem";
