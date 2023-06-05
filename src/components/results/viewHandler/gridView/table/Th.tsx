import React, { Component } from "react";
import { SelectFilter, Option } from "../../../../forms";
import TableHeadResize from "./table-head-resize";
import Dropdown, { DropdownButton, DropdownMenu } from "../../../../dropdown/dropdown";

interface TableHeadProps {
  title: string;
  columnKey: string;

  colSpan?: any;
  rowSpan?: any;
  width: any;

  hasCheckbox?: any;

  updateColumnsWidth: Function;

  filterOptions: any[];
  //onFilterChange: Function;

  currentOrderValue?: string;
  currentOrderDirection?: string;
  sortable: boolean;
  onChangeSortBy: Function;

  disableReorder: any;
  activateReorder: Function;

  infoHover?: string;
  children?: React.ReactNode;
}

interface TableHeadState {
  ascending: boolean;
  sortBy: string;
}

export default class Th extends Component<TableHeadProps, TableHeadState> {
  state = { ascending: this.props.currentOrderDirection ? this.props.currentOrderDirection === "asc" : false, sortBy: this.props.currentOrderValue ? this.props.currentOrderValue : "" };

  _mouseIsDown: boolean = false;
  _pageX: number | null = null;
  _currentColumn: any = null;
  _currentColumnWidth: number | null = null;
  _nextColumn: any = null;
  _nextColumnWidth: number | null = null;
  _tableHeadCells: any[] = [];

  componentDidMount = () => {
    const self = this;

    //RESIZE BINDINGS
    if (typeof document !== "undefined") {
      document.addEventListener("mousemove", function (e) {
        self.resizeMouseMove(e);
      });
      document.addEventListener("mouseup", function () {
        self._mouseIsDown = false;
        self.resizeMouseUp();
      });
    }
    //END RESIZE BINDINGS
  };

  resizeMouseDown = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.stopPropagation();
    this._currentColumn = e.currentTarget.parentElement;
    this._nextColumn = this._currentColumn.nextElementSibling;
    this._pageX = e.pageX;
    this._currentColumnWidth = this._currentColumn.offsetWidth;
    this._nextColumnWidth = this._nextColumn ? this._nextColumn.offsetWidth : null;
    this._mouseIsDown = true;
  };

  resizeMouseMove = (e: any) => {
    e.stopPropagation();
    if (this._mouseIsDown) {
      let diffX = e.pageX - (this._pageX ? this._pageX : 0);
      let nextColumnWidth = (this._nextColumnWidth ? this._nextColumnWidth : 0) - diffX;
      let currentColumnWidth = (this._currentColumnWidth ? this._currentColumnWidth : 0) + diffX;

      if (this._nextColumn) this._nextColumn.style.minWidth = `${nextColumnWidth}px`;
      if (this._currentColumn) this._currentColumn.style.minWidth = `${currentColumnWidth}px`;
    }
  };

  resizeMouseUp = () => {
    if (this._currentColumn && this._nextColumn) {
      this._tableHeadCells = Array.from(this._currentColumn.parentElement.children);

      let columnsData_v2: any[] = [];

      this._tableHeadCells.forEach((element) => {
        const thisColumnData = {
          columnKey: element.attributes["data-sortby"].value,
          width: element.offsetWidth,
        };
        columnsData_v2.push(thisColumnData);
      });
      this.props.updateColumnsWidth(columnsData_v2);
    }

    //send current width to parent and then store in user
    this._mouseIsDown = false;
    this._pageX = null;
    this._currentColumn = null;
    this._currentColumnWidth = null;
    this._nextColumn = null;
    this._nextColumnWidth = null;
  };

  changeSortBy = (e: React.MouseEvent<HTMLButtonElement>) => {
    const self = this;
    const orderAttr = (e.currentTarget.attributes as any)["data-sortby"];

    if (orderAttr && orderAttr.value) {
      if (self.state.ascending) {
        self.setState({ sortBy: orderAttr.value, ascending: false });
        self.props.onChangeSortBy(orderAttr.value, "desc");
      } else {
        self.setState({ sortBy: orderAttr.value, ascending: true });
        self.props.onChangeSortBy(orderAttr.value, "asc");
      }
    }
  };

  renderReorder = () => {
    if (!this.props.disableReorder) {
      return (
        <div title="Re-order columns" className="reorder-trigger" onMouseDown={(e) => this.props.activateReorder(e)}>
          <i className="fas fa-arrows-alt"></i>
        </div>
      );
    } else {
      return null;
    }
  };

  renderDropdownFilter() {
    const filterOptions = this.props.filterOptions;

    if (filterOptions && filterOptions.length) {
      filterOptions.sort(function (a: any, b: any) {
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      });
      return (
        <Dropdown keepShown className="data-table-filter-header">
          <DropdownButton>
            <button type="button" className="data-table-filter-header-btn">
              <span className="material-icons">filter_alt</span>
            </button>
          </DropdownButton>
          <DropdownMenu>
            <SelectFilter className="dropdown-filter mb0" multiple={true} name={this.props.columnKey}>
              {filterOptions.length &&
                filterOptions.map((option: any, index: number) => {
                  const value = typeof option === "object" ? option.value : option;
                  const label = typeof option === "object" ? option.label : option;
                  return <Option key={index} value={value} label={label} />;
                })}
            </SelectFilter>
          </DropdownMenu>
        </Dropdown>
      );
    }
    return <></>;
  }

  render() {
    let orderCssClass = this.props.currentOrderValue === this.props.columnKey ? "active" : "";

    if (orderCssClass === "active") {
      orderCssClass = this.state.ascending ? orderCssClass + " asc" : orderCssClass + " desc";
    }

    const title = this.props.disableReorder || !this.props.sortable ? this.props.title : `${"sortBy"} ${this.props.title}` + (this.state.ascending ? ` (ascending)` : ` (descending)`);
    const thClassName = this.props.sortable ? "sortable-th " + orderCssClass : "";

    return (
      <td title={title} className={thClassName} data-sortby={this.props.columnKey} colSpan={this.props.colSpan} rowSpan={this.props.rowSpan} data-testid={this.props.columnKey}>
        <div className="table-content">
          {this.props.children}
          {this.props.sortable && (
            <button onClick={this.changeSortBy} className="sortable-button" data-sortby={this.props.columnKey}>
              <span className="material-icons up">arrow_drop_up</span>
              <span className="material-icons down">arrow_drop_down</span>
            </button>
          )}
          {/* {this.props.infoHover && (
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={
                <Tooltip id="button-tooltip">
                  <p style={{ padding: 0, margin: 0 }}>{toLiteral({ id: this.props.infoHover })}&nbsp;</p>
                </Tooltip>
              }
            >
              <i className="fas fa-exclamation-circle fa-xs -warning"></i>
            </OverlayTrigger>
          )} */}

          {this.props.filterOptions && this.renderDropdownFilter()}
          {<TableHeadResize resizeMouseDown={this.resizeMouseDown} />}
        </div>
      </td>
    );
  }
}
