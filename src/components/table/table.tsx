import React from 'react';
export {default as TBody} from './TBody';
export {default as TElement} from './TElement';
export {default as THead} from './THead';
export {default as TRow} from './TRow';
export interface ITableProps {
  disabled?: boolean;
  className?: string;
  [others: string]: any;
}

const Table: React.FC<ITableProps> = ({disabled, children, className, ...rest}) => {
  return (
    <>
      <div className="table-rotate-device">
        <span className="material-icons">screen_rotation</span>
        <span className="table-rotate-device-text">Rotate your device</span>
      </div>
      <div className="table-wrapper">
        <table
          data-disabled={disabled}
          className={className || ''}
          role="none"
          {...rest}
          data-testid={rest['data-testid'] ? rest['data-testid'] + '-wrapper' : ''}
        >
          {children}
        </table>
      </div>
    </>
  );
};

export default Table;