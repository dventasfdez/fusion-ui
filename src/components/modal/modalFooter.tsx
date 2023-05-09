import React from 'react';

interface IModalFooterProps {
  className?: string;
  [others: string]: any;
}

const ModalFooter: React.FC<IModalFooterProps> = ({className, children, ...rest}) => (
  <div {...rest} className={`modal-footer ${className || ''}`}>
    {children}
  </div>
);

export default ModalFooter;
