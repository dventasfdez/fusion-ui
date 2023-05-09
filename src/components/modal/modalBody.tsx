import React from 'react';

interface IModalBodyProps {
  className?: string;
  [others: string]: any;
}

const ModalBody: React.FC<IModalBodyProps> = ({className, children, ...rest}) => (
  <div className={`modal-body ${className || ''}`} {...rest}>
    {children}
  </div>
);

export default ModalBody;
