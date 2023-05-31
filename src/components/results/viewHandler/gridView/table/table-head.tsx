import React, { Component } from "react";
import Th from "./Th";

interface TableHeadProps {
  columns: any[];
  sortBy?: string;
  sortDirection?: string;
  changeSortBy: Function;
  renderHeader?: Function;
  //onFilterChange: Function;
  updateColumnsWidth: Function;
  activateReorder: Function;
  reorderOnMouseUp: Function;
  renderHeaders?: Function;
}
class TableHead extends Component<TableHeadProps> {
  renderHeadColumn() {
    let rowSpan = this.getMaxRowSpan();
    const sortBy = this.props.sortBy ? this.props.sortBy : undefined;
    const sortDirection = this.props.sortDirection ? this.props.sortDirection : undefined;
    return this.props.columns.map((column, index) => {
      return (
        <Th
          rowSpan={rowSpan}
          hasCheckbox={column.hasCheckbox}
          key={index}
          title={column.title}
          width={column.width}
          currentOrderValue={sortBy}
          currentOrderDirection={sortDirection}
          disableReorder={column.disableReorder}
          sortable={column.sortable}
          columnKey={column.columnKey}
          filterOptions={column.filterOptions}
          onChangeSortBy={this.props.changeSortBy}
          //onFilterChange={this.props.onFilterChange}
          updateColumnsWidth={this.props.updateColumnsWidth}
          activateReorder={this.props.activateReorder}
          infoHover={column.info}
        >
          {column.title}
        </Th>
      );
    });
  }

  getMaxRowSpan = () => {
    let rowSpan = 1;
    this.props.columns.forEach((element) => {
      if (element.children && element.children.length > 0) {
        rowSpan = 2;
      }
    });
    return rowSpan;
  };

  render() {
    if (typeof this.props.renderHeader === "function") {
      return this.props.renderHeader(this.props.columns);
    }
    return (
      <thead>
        <tr>{this.renderHeadColumn()}</tr>
      </thead>
    );
  }
}

export default TableHead;
