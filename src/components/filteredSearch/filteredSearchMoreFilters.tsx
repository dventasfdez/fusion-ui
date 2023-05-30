import React from 'react';
import Select from '../select/select';

export interface IMoreFilterProps {
  /**
   * Children for Displaying its content
   */
  children: typeof Select[] | any;
}

const MoreFilters: React.FC<IMoreFilterProps> = ({children}) => {
  if (React.Children.toArray(children).every((child) => React.isValidElement(child) && child.type === Select))
    return children;
  return null;
};

export default MoreFilters;
