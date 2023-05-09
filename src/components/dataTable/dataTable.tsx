import React, {useEffect, useState} from 'react';
import Paginator from '../paginator/paginator';
import Searchbox from '../searchbox/searchbox';
import Table from '../table/table';
import Tabs from '../tabs/tabs';
import DataTableTopToolbar from './dataTableTopToolbar';
import DataTableActionBar from './dataTableActionBar';
export {default as DataTableActionBar} from './dataTableActionBar';
export {default as DataTableTopToolbar} from './dataTableTopToolbar';
interface IDataTableProps {
  className?: string;
  defaultActiveTab?: string;
  [others: string]: any;
}
export interface IDataTableChildProps {
  className?: string;
  [others: string]: any;
}

const DataTable: React.FC<IDataTableProps> = ({className, children, defaultActiveTab, ...rest}) => {
  const [dimensions, setDimensions] = useState({width: window.innerWidth, height: window.innerHeight});

  const handleResize = () => {
    setDimensions({width: window.innerWidth, height: window.innerHeight});
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    renderDataTable();
  }, [defaultActiveTab]);

  const renderDataTable = () => {
    let topToolbar = null,
      actionBar: any = null,
      table: any = null,
      paginator: any = null;
    if (children) {
      React.Children.forEach(children, (_child: any, idx) => {
        if (_child && _child.type) {
          switch (_child.type) {
            case DataTableTopToolbar:
              if (React.Children.toArray(_child).length >= 1) {
                const _tabs = _child.props.children.find((_subChild: any) => _subChild.type === Tabs);
                if (_tabs) {
                  const content = confContentActiveTab(_tabs);
                  actionBar = content.actionBar;
                  table = content.table;
                  paginator = (
                    <div key={'data-table-paginator' + idx} className="data-table-paginator">
                      {content.paginator}
                    </div>
                  );
                  let _childChildrens = null;

                  if (dimensions.width <= 672) {
                    _childChildrens = confToolbarChildsMobile(_child.props.children);
                  } else {
                    _childChildrens = confToolbarChildsDesktop(_child.props.children);
                  }

                  _child = React.cloneElement(_child, {
                    ..._child.props,
                    children: _childChildrens,
                  });
                }
                topToolbar = _child;
              }

              break;
            case DataTableActionBar:
              actionBar = _child;
              break;
            case Table:
              table = _child;
              break;
            case Paginator:
              paginator = (
                <div key={'data-table-paginator' + idx} className="data-table-paginator">
                  {_child}
                </div>
              );
              break;
          }
        }
      });
    }
    return [topToolbar, actionBar, table, paginator];
  };

  const confContentActiveTab = (_tabs: any) => {
    let _actionBarTab: any = null,
      _tableTab: any = null,
      _paginatorTab: any = null;
    React.Children.forEach(_tabs.props.children, (_tabChild: any, idx: number) => {
      if (_tabChild.props.id === defaultActiveTab || (!defaultActiveTab && idx === 0)) {
        const _tabContent = _tabChild.props.children;
        React.Children.forEach(_tabContent, (_childTabContent) => {
          switch (_childTabContent.type) {
            case DataTableActionBar:
              _actionBarTab = _childTabContent;
              break;
            case Table:
              _tableTab = _childTabContent;
              break;
            case Paginator:
              _paginatorTab = _childTabContent;
              break;
          }
        });
      }
    });
    return {actionBar: _actionBarTab, table: _tableTab, paginator: _paginatorTab};
  };

  const confToolbarChildsMobile = (_childrensToolbar: any) => {
    let _tabs: any = null,
      _searchbox: any = null;
    const _rest: any[] = [];
    React.Children.forEach(_childrensToolbar, (_toolbarChild: any) => {
      if (_toolbarChild.type === Tabs) {
        const _tabsChildren = React.Children.map(_toolbarChild.props.children, (_tabChild: any) =>
          React.cloneElement(_tabChild, {..._tabChild.props, children: null})
        );
        _tabs = React.cloneElement(_toolbarChild, {..._toolbarChild.props, children: _tabsChildren});
      } else if (_toolbarChild.type === Searchbox) {
        _searchbox = _toolbarChild;
      } else {
        _rest.push(_toolbarChild);
      }
    });

    let _restItems = null;

    if (_rest)
      _restItems = (
        <div key={_rest.toString()} className="data-table-top-toolbar_middle">
          {_rest}
        </div>
      );

    return [_tabs, _restItems, _searchbox];
  };

  const confToolbarChildsDesktop = (_childrensToolbar: any) => {
    return React.Children.map(_childrensToolbar, (_toolbarChild: any) => {
      if (_toolbarChild.type === Tabs) {
        const _tabsChildren = React.Children.map(_toolbarChild.props.children, (_tabChild: any) =>
          React.cloneElement(_tabChild, {..._tabChild.props, children: null})
        );
        return React.cloneElement(_toolbarChild, {..._toolbarChild.props, children: _tabsChildren});
      }
      return _toolbarChild;
    });
  };

  return (
    <div className={`data-table-wrapper ${className || ''}`} {...rest}>
      {renderDataTable()}
    </div>
  );
};

export default DataTable;
