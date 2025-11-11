import React, {
  MouseEvent,
  Children,
  cloneElement,
  ComponentProps,
  HTMLAttributes,
  isValidElement,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import TabItem from "./item";
import Dropdown, { DropdownButton, DropdownMenu } from "../dropdown/dropdown";
import { useDevice } from "../../hooks/useDevice/useDevice";
import clsx from "clsx";
import Button from "../button/button";

export { default as TabItem } from "./item";
type TabsProps = HTMLAttributes<HTMLDivElement> & {
  children:
    | ReactElement<ComponentProps<typeof TabItem>, typeof TabItem>
    | ReactElement<ComponentProps<typeof TabItem>, typeof TabItem>[];
  /**
   * Change horizontal for vertical allignment
   */
  vertical?: boolean;
  /**
   * Indicates the active tab when the component is rendered
   */
  defaultActive?: string;
  onChangeTab?: (_id: string) => void;
};

const Tabs: React.FC<TabsProps> = ({
  defaultActive,
  vertical,
  children,
  className,
  onChangeTab,
  ...rest
}) => {
  const { isMobile } = useDevice();
  const [active, setActive] = useState<string>(
    defaultActive ? defaultActive : ""
  );

  useEffect(() => {
    if (defaultActive && defaultActive !== active) setActive(defaultActive);
  }, [defaultActive]);

  const onClickTab = (
    e: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLLIElement>
  ) => {
    const _id = e.currentTarget.id;
    setActive(_id);
    if (typeof onChangeTab === "function") onChangeTab(_id);
  };

  const list = useCallback(() => {
    const _children = Children.toArray(children);

    const items: ReactElement<ComponentProps<typeof Button>, typeof Button>[] =
      [];
    const menu: any[] = [];
    let _collapsed = 0;
    _children.forEach((_child, index: number) => {
      if (isValidElement(_child) && _child.type === TabItem) {
        const _valid = _child as ReactElement<
          ComponentProps<typeof TabItem>,
          typeof TabItem
        >;

        const { id, disabled, title, collapsed } = _valid.props;
        const isCollapsed =
          (!isMobile && index - _collapsed >= 5) ||
          (isMobile && index - _collapsed >= 3) ||
          collapsed;

        const isActive =
          active === id || (!active && index === 0) || _children.length === 1;

        if (!isCollapsed) {
          items.push(
            <Button
              id={id}
              key={`${id}-key`}
              disabled={disabled}
              onClick={onClickTab}
              className={clsx("tab-list-item", {
                active: isActive,
              })}
            >
              {title}
            </Button>
          );
        } else {
          _collapsed++;
          menu.push(
            <li
              role="button"
              id={id}
              key={`${id}-key`}
              onClick={onClickTab}
              className={clsx({
                "dropdown-item": !isActive,
                "dropdown-item_selected": isActive,
              })}
            >
              {title}
            </li>
          );
        }
      }
    });

    if (menu.length) {
      items.push(dropdown(menu, items.length - 1));
    }

    return <div className="tab-list">{items}</div>;
  }, [children, active]);

  const dropdown = (menu: any, listLenght: number) => {
    const _disabledElements = (menu as any[]).filter(
      (_element: any) => _element.props?.disabled
    );
    const _activeElements = (menu as any[]).filter((_element: any) => {
      const _classes = _element.props?.className.split(" ");
      if (_classes[_classes.length - 1] === "active") return true;
      return false;
    });

    return (
      <Dropdown
        key={"dropdown-" + listLenght}
        disabled={_disabledElements.length === menu.length}
      >
        <DropdownButton>
          <button
            type="button"
            className={_activeElements.length ? "active" : ""}
          >
            <span className="material-icons">more_vert</span>
          </button>
        </DropdownButton>
        <DropdownMenu>{menu}</DropdownMenu>
      </Dropdown>
    );
  };

  const content = useMemo(() => {
    const _children = Children.toArray(children) as ReactElement<
      ComponentProps<typeof TabItem>,
      typeof TabItem
    >[];
    console.log(
      "active",
      active,
      _children,
      _children.find(
        (_child) =>
          isValidElement(_child) &&
          _child.type === TabItem &&
          _child.props.id === active
      )
    );

    return _children.find(
      (_child, index: number) =>
        isValidElement(_child) &&
        _child.type === TabItem &&
        (_child.props.id === active || (!active && index === 0))
    );
  }, [children, active]);

  return (
    <div
      className={clsx({ tabs: !vertical, tabs_vertical: vertical })}
      {...rest}
    >
      {list()}
      {content}
    </div>
  );
};

export default Tabs;
