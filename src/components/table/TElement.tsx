import React from 'react';

export interface ITableElement {
  className?: string;
  [others: string]: any;
}

const TElement: React.FC<ITableElement> = ({children, className, ...rest}) => (
  <td className={className || ''} {...rest}>
    <div className="table-content">{children}</div>
  </td>
);

export default TElement;
