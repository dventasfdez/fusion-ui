import React from 'react';

interface IModalHeaderProps {
  className?: string;
  [others: string]: any;
}

const ModalHeader: React.FC<IModalHeaderProps> = ({className, children, ...rest}) => (
  <div {...rest} className={`modal-header ${className || ''}`}>
    {children}
  </div>
);

export default ModalHeader;
