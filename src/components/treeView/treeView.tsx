import React from 'react';
import TreeViewElement from './treeViewElement';
export {default as TreeViewElement} from './treeViewElement';

interface ITree {
  /**
   * Alternative className for Tree
   */
  className?: string;
  [other: string]: any;
}

const Tree: React.FC<ITree> = ({children, className, ...rest}) => {
  const renderable = React.Children.toArray(children).every((child: any) => child.type === TreeViewElement);
  return renderable ? (
    <div className={`tree-container ${className || ''}`} {...rest}>
      {children}
    </div>
  ) : null;
};

export default Tree;
