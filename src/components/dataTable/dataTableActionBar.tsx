import React from 'react';
import {IDataTableChildProps} from './dataTable';

const DataTableActionBar: React.FC<IDataTableChildProps> = ({className, children, ...rest}) => {
  return (
    <div className={`data-table-action-bar ${className || ''}`} {...rest}>
      {children}
    </div>
  );
};

export default DataTableActionBar;
