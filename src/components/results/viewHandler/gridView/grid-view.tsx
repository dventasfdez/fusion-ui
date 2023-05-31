import React, { Component } from "react";
import TableHead from "./table/table-head";
import { activateReorder, bindReorder, reorderOnMouseUp } from "./table/Columns.Service";
import TableContent from "./table/table-content";
import { ResultsI } from "../../constants";

interface GridViewProps {
  columns: any;
  renderItems?: any;
  renderHeader?: any;
  results?: ResultsI;
  sortBy?: string;
  sortDirection?: string;
  changeSortBy: Function;
  updateColumnsConfiguration: Function;
  tableId?: string;
  showTopScroll?: any;
  newUI?: boolean;
}

interface GridViewState {
  columns: any;
}
export default class GridView extends Component<GridViewProps, GridViewState> {
  tableRef: React.RefObject<HTMLTableElement> = React.createRef();
  bottomScrollRef: React.RefObject<HTMLDivElement> = React.createRef();
  topScrollRef: React.RefObject<HTMLDivElement> = React.createRef();
  hasScrollBar: boolean = false;

  constructor(props: any) {
    super(props);
    this.state = {
      columns: [...this.props.columns],
    };
  }

  componentDidMount() {
    bindReorder(this);
    if (this.topScrollRef && this.bottomScrollRef && this.topScrollRef.current && this.bottomScrollRef.current) {
      this.topScrollRef.current.addEventListener("scroll", (ev) => {
        if (this.topScrollRef && this.bottomScrollRef && this.topScrollRef.current && this.bottomScrollRef.current && this.tableRef && this.tableRef.current) {
          this.bottomScrollRef.current.scrollLeft = this.topScrollRef.current.scrollLeft;
          this.hasScrollBar = this.tableRef.current.clientHeight > this.bottomScrollRef.current.clientHeight;
        }
      });
      this.bottomScrollRef.current.addEventListener("scroll", (ev) => {
        if (this.topScrollRef && this.bottomScrollRef && this.topScrollRef.current && this.bottomScrollRef.current && this.tableRef && this.tableRef.current) {
          this.topScrollRef.current.scrollLeft = this.bottomScrollRef.current.scrollLeft;
          this.hasScrollBar = this.tableRef.current.clientHeight > this.bottomScrollRef.current.clientHeight;
        }
      });
    }
  }

  componentDidUpdate(prevState: any) {
    if (this.tableRef && this.tableRef.current && this.bottomScrollRef && this.bottomScrollRef.current) {
      this.hasScrollBar = this.tableRef.current.clientHeight > this.bottomScrollRef.current.clientHeight;
    }

    if (JSON.stringify(this.state.columns) !== JSON.stringify(this.props.columns)) {
      this.setState({ columns: this.props.columns });
    }
  }

  componentWillUnmount() {
    if (this.topScrollRef && this.topScrollRef.current && this.bottomScrollRef && this.bottomScrollRef.current) {
      this.topScrollRef.current.removeEventListener("scroll", (ev) => {});
      this.bottomScrollRef.current.removeEventListener("scroll", (ev) => {});
    }
  }

  render() {
    const tableRefClientWidth = `${this.tableRef?.current?.clientWidth}px`;
    return (
      <>
        {this.props.showTopScroll && (
          <div className="table-responsive-top-scroll-wrapper" ref={this.topScrollRef} style={{ marginRight: this.hasScrollBar ? "10px" : "" }}>
            <div className="table-responsive-top-scroll" style={{ width: this.tableRef?.current ? tableRefClientWidth : "0px" }}></div>
          </div>
        )}

        {
          <div className="table-wrapper" ref={this.bottomScrollRef}>
            <table ref={this.tableRef} id={this.props.tableId || "table"}>
              <TableHead
                columns={this.state.columns}
                sortBy={this.props.sortBy}
                sortDirection={this.props.sortDirection}
                changeSortBy={this.props.changeSortBy}
                //onFilterChange={this.props.onFilterChange}
                activateReorder={(e: any) => activateReorder(this, e)}
                updateColumnsWidth={this.props.updateColumnsConfiguration}
                reorderOnMouseUp={(e: any) => reorderOnMouseUp(this, e)}
                renderHeader={this.props.renderHeader}
              />
              {this.props.results && this.props.results.count ? (
                <TableContent
                  parentRef={this.tableRef}
                  columns={this.state.columns}
                  results={this.props.results}
                  renderItems={this.props.renderItems}
                  //nestedRows={this.props.nestedRows}
                />
              ) : typeof this.props.results === "undefined" ? (
                <tbody>
                  <tr className="no-results">
                    <td colSpan={this.state.columns.length}>LOADING</td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  <tr className="no-results">
                    <td colSpan={this.state.columns.length}>NO RESULTS</td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        }
      </>
    );
  }
}
