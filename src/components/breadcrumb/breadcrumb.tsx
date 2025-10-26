import React, {
  Children,
  DetailedHTMLProps,
  HTMLAttributes,
  ReactElement,
  ComponentProps,
} from "react";
import Dropdown, { DropdownButton, DropdownMenu } from "../dropdown/dropdown";
import clsx from "clsx";
import BreadcrumbItem from "./item";
import Icon from "../icon/icon";

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
          <Icon name="more_horiz" />
        </DropdownButton>
        <DropdownMenu>{items}</DropdownMenu>
      </Dropdown>
    );
  };

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
        return [
          _child,
          <Icon
            key={index}
            name="chevron_right"
            className="breadcrumb-separator"
            size="small"
          />,
        ];
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
export { default as BreadcrumbItem } from "./item";
