import React, {useRef, useState} from 'react';
import OverflowMenu from '../overflowMenu/overflowMenu';
import Tree, {TreeViewElement} from '../treeView/treeView';

export interface IHeaderItemOption {
  id?: string;
  label: string;
  onClick?: () => void;
  href?: string;
}
export interface IHeaderItemProps {
  id?: string;
  className?: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  options?: IHeaderItemOption[];
  optionsDivider?: boolean;
  children: string;
  [others: string]: any;
}

const HeaderItem: React.FC<IHeaderItemProps> = (props) => {
  const {className, children, id, selected, onClick, options, disabled, optionsDivider, ...rest} = props;
  const [showOptions, setShowOptions] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const onClickItem = (e?: React.MouseEvent) => {
    if (options) {
      if (rest && rest['data-mobile']) e?.stopPropagation();
      setShowOptions(!showOptions);
    }
    if (typeof onClick === 'function') {
      onClick();
    }
  };
  const renderItem = () => {
    if (rest && rest['data-mobile']) {
      return (
        <Tree>
          <TreeViewElement name={children} arrow="right" onClick={onClickItem} {...rest}>
            {options &&
              options.map((_opt: IHeaderItemOption, _idx: number) =>
                _opt.href ? (
                  <a
                    data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-option-${_idx}` : undefined}
                    key={_opt.id || `header-item-option-${_idx}`}
                    href={_opt.href}
                  >
                    {_opt.label}
                  </a>
                ) : (
                  <div
                    key={_opt.id || `header-item-option-${_idx}`}
                    data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-option-${_idx}` : undefined}
                    onClick={() => {
                      if (typeof _opt.onClick === 'function') _opt.onClick();
                    }}
                  >
                    {_opt.label}
                  </div>
                )
              )}
          </TreeViewElement>
        </Tree>
      );
    }
    return (
      <button
        type="button"
        ref={buttonRef}
        id={id}
        key={'button-' + id}
        data-testid={rest && rest['data-testid'] ? rest['data-testid'] : undefined}
        disabled={disabled}
        onClick={onClickItem}
        className={`tab-list-item ${selected ? 'active' : ''} ${className || ''}`}
      >
        {children}
        {options && (
          <OverflowMenu
            className={`header-item-overflow-menu${optionsDivider ? '_divider' : ''}`}
            title={children}
            show={showOptions}
            onClose={() => setShowOptions(false)}
            parentRef={buttonRef}
            data-handlecloseclick
            data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-overflow-menu` : undefined}
          >
            {options.map((_opt: IHeaderItemOption, _idx: number) =>
              _opt.href ? (
                <a
                  data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-overflow-menu-item-${_idx}` : undefined}
                  className="dropdown-item"
                  key={_opt.id || `header-item-option-${_idx}`}
                  href={_opt.href}
                >
                  {_opt.label}
                </a>
              ) : (
                <div
                  key={_opt.id || `header-item-option-${_idx}`}
                  className="dropdown-item"
                  onClick={() => {
                    if (typeof _opt.onClick === 'function') _opt.onClick();
                  }}
                  data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-overflow-menu-item-${_idx}` : undefined}
                >
                  {_opt.label}
                </div>
              )
            )}
          </OverflowMenu>
        )}
      </button>
    );
  };
  return renderItem();
};

export default HeaderItem;
