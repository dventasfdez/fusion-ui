import React from 'react';
import Searchbox, {ISearchboxProps} from '../searchbox/searchbox';
import Dropdown, {DropdownButton, DropdownMenu} from '../dropdown/dropdown';
import {useDevice} from '../../hooks/useDevice/useDevice';

interface INavigationSearch extends ISearchboxProps {
  [others: string]: any;
}

const NavigationSearch: React.FC<INavigationSearch> = ({...rest}) => {
  const {isMobile} = useDevice();

  if (isMobile)
    return (
      <div className="navigation-search">
        <Searchbox small {...rest} />
      </div>
    );
  return (
    <Dropdown className="navigation-search" keepShown>
      <DropdownButton>
        <span className="material-icons">search</span>
      </DropdownButton>
      <DropdownMenu className="p2">
        <Searchbox small {...rest} />
      </DropdownMenu>
    </Dropdown>
  );
};
export default NavigationSearch;
