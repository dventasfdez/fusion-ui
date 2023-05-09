import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import {useDropdown} from './dropdown';

export interface DropdownMenuProps {
  className?: string;
  [others: string]: any;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({className, children, ...rest}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const {showMenu, setDropdownMenuDimensions, position, dropdownRef, handleClickMenu, keepShown} = useDropdown();

  useEffect(() => {
    if (ref && ref.current) {
      const positionMenu = ref.current.getBoundingClientRect();
      if (positionMenu)
        setDropdownMenuDimensions({
          width: positionMenu.width,
          height: positionMenu.height,
        });
    }
  }, [showMenu]);

  const content = (
    <div
      ref={ref}
      className={`dropdown-menu ${showMenu ? '' : 'hidden'} ${className || ''}`}
      style={position}
      onClick={keepShown ? handleClickMenu : undefined}
      {...rest}
    >
      {children}
    </div>
  );
  if (dropdownRef && dropdownRef.current) {
    const root = document.getElementById('root');
    return ReactDOM.createPortal(content, dropdownRef.current || root || document.body);
  }
  return null;
};

export default DropdownMenu;
