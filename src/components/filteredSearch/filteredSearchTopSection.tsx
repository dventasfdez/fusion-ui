import React from 'react';

export interface IFilteredSearchTopSection {
  /**
   * Children for Displaying its content
   */
  children: React.ReactChild[] | React.ReactChild;
}

const FilteredSearchTopSection: React.FC<IFilteredSearchTopSection> = ({children}) => {
  if (children) return <div className="filtered-search-top">{children}</div>;
  return null;
};

export default FilteredSearchTopSection;
