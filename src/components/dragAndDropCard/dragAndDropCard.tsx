import React, {useState} from 'react';
import Dropdown, {DropdownButton, DropdownMenu} from '../dropdown/dropdown';

import DragAndDropCardHeader from '../card/cardHeader';

export {default as DragAndDropCardHeader} from '../card/cardHeader';

export interface IDragAndDropCardProps {
  /**
   * Identifies the card
   */
  id?: string;
  /**
   * Add class to card
   */
  className?: string;
  /**
   * Add options for dropdown option
   */
  options?: {id?: string; label: string; onClick?: () => void; [others: string]: any}[];
  /**
   * Set placeholder type
   */
  placeholder?: boolean;
  /**
   * Set completed styles
   */
  completed?: boolean;
  /**
   * Set draggable option
   */
  draggable?: boolean;
  /**
   * Set active option
   */
  active?: boolean;
  /**
   * Set header of card
   */
  children: React.ReactComponentElement<typeof DragAndDropCardHeader>;

  [others: string]: any;
}

const DragAndDropCard: React.FC<IDragAndDropCardProps> = (props) => {
  const {id, children, className, options, placeholder, completed, draggable, active, ...rest} = props;
  const [showMenu, setShowMenu] = useState(false);

  const renderDragAndDropVariant = () => {
    if (options && options.length > 0 && draggable) {
      return (
        <div
          id={id || ''}
          className={`card_drag-drop${completed ? '_completed' : ''} ${active ? 'active' : ''} ${className || ''}`}
          draggable
          onMouseEnter={() => setShowMenu(true)}
          onMouseLeave={() => setShowMenu(false)}
          {...rest}
        >
          {children}
          <Dropdown defaultShow={showMenu} onChangeToggleMenu={setShowMenu}>
            <DropdownButton data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-dropdown-btn` : undefined}>
              <span className="material-icons">more_vert</span>
            </DropdownButton>
            <DropdownMenu>
              <ul>
                {options &&
                  options.map((_option: {label: string; onClick?: () => void; [others: string]: any}, index: number) => {
                    const {label, onClick, id, ...others} = _option;
                    return (
                      <li
                        id={id || `option-card-${index}`}
                        key={id || `option-card-${index}`}
                        className="dropdown-item"
                        onClick={() => {
                          if (typeof onClick === 'function') onClick();
                        }}
                        data-testid={
                          rest && rest['data-testid'] ? `${rest['data-testid']}-dropdown-item-${index}` : undefined
                        }
                        {...others}
                      >
                        {label}
                      </li>
                    );
                  })}
              </ul>
            </DropdownMenu>
          </Dropdown>
        </div>
      );
    }

    if (placeholder) {
      return (
        <div id={id || ''} className={`card_drag-drop_placeholder ${className || ''}`} {...rest}>
          {children}
        </div>
      );
    }
    if (options && options.length > 0) {
      return (
        <div id={id || ''} className={`card_drag-drop_dropdown ${className || ''}`} {...rest}>
          <Dropdown onChangeToggleMenu={setShowMenu}>
            <DropdownButton data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-dropdown-btn` : undefined}>
              {children}
              <span className="material-icons">{showMenu ? 'arrow_drop_up' : 'arrow_drop_down'}</span>
            </DropdownButton>
            <DropdownMenu style={{top: 'inherit', left: 'inherit'}}>
              <ul>
                {options &&
                  options.map((_option: {label: string; onClick?: () => void}, index: number) => (
                    <li
                      key={`option-card-${index}`}
                      className="dropdown-item"
                      onClick={() => {
                        if (typeof _option.onClick === 'function') _option.onClick();
                      }}
                      data-testid={rest && rest['data-testid'] ? `${rest['data-testid']}-dropdown-item-${index}` : undefined}
                    >
                      {_option.label}
                    </li>
                  ))}
              </ul>
            </DropdownMenu>
          </Dropdown>
        </div>
      );
    }
    return (
      <div
        id={id || ''}
        className={`card_drag-drop${completed ? '_completed' : ''} ${active ? 'active' : ''} ${className || ''}`}
        draggable={draggable}
        {...rest}
      >
        {children}
      </div>
    );
  };
  return renderDragAndDropVariant();
};

export default DragAndDropCard;
