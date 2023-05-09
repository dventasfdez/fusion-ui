import React from 'react';
import {IDataTableChildProps} from './dataTable';

const DataTableTopToolbar: React.FC<IDataTableChildProps> = ({className, children, ...rest}) => {
  return (
    <div className={`data-table-top-toolbar ${className || ''}`} {...rest}>
      {children}
    </div>
  );
};

export default DataTableTopToolbar;
