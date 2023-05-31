import React, { Component } from "react";
import DefaultGridViewItem from "../default-grid-view-item";
import { ResultsI } from "../../../constants";

interface TableContentProps {
  columns: any[];
  results?: ResultsI;
  renderItems: Function;
  parentRef: React.MutableRefObject<any>;
}

export default class TableContent extends Component<TableContentProps> {
  calculateColSpan = () => {
    let colSpan = this.props.columns ? this.props.columns.length : 0;
    if (Array.isArray(this.props.columns)) {
      this.props.columns.forEach((col) => {
        if (col.children && Array.isArray(col.children)) {
          colSpan += col.children.length - 1;
        }
      });
    }
    return colSpan;
  };
  renderResults() {
    const colSpan = this.calculateColSpan();
    //check if results are loaded into state
    if (this.props.results) {
      //check if there is one or more results
      if (this.props.results.count && this.props.results.count > 0) {
        let visibleColumns = this.props.columns.filter((el) => !el.hidden || el.hidden === false);
        if (this.props.renderItems) {
          return <tbody>{this.props.renderItems(this.props.results, visibleColumns, this.props.parentRef)}</tbody>;
        } else {
          return <tbody>{this.renderDefaultItems(this.props.results, visibleColumns)}</tbody>;
        }
      } else if (this.props.results.count === 0) {
        //data is loaded but 0 results
        return (
          <tbody>
            <tr>
              <td colSpan={colSpan}>NORESULTS</td>
            </tr>
          </tbody>
        );
      } else {
        return (
          <tbody>
            <tr>
              <td colSpan={colSpan}>LOADING</td>
            </tr>
          </tbody>
        );
      }
    } else {
      //data is not loaded yet
      return (
        <tbody>
          <tr>
            <td colSpan={colSpan}>LOADING</td>
          </tr>
        </tbody>
      );
    }
  }

  renderDefaultItems = (results: { data: any[]; count: number }, columns: any[]) => {
    let childrenWithProps = results.data.map((item, index) => {
      return <DefaultGridViewItem key={index} columns={columns} item={item} />;
    });
    return childrenWithProps;
  };

  render() {
    return this.renderResults();
  }
}
