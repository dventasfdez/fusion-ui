import React from 'react';
export {default as EmptyStateDescription} from './emptyStateDescription';
export {default as EmptyStateImg} from './emptyStateImg';
export {default as EmptyStateTitle} from './emptyStateTitle';

export interface IEmptyStateProps {
  className?: string;
}

const EmptyState: React.FC<IEmptyStateProps> = ({className, children, ...rest}) => {
  return (
    <div className={`empty-state ${className || ''}`} {...rest}>
      {children}
    </div>
  );
};

export default EmptyState;
