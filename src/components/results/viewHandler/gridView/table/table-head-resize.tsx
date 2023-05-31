import React, { Component } from "react";

export interface IProps {
  [others: string]: any;
}

export default class TableHeadResize extends Component<IProps> {
  render() {
    return <div onMouseDown={(e) => this.props.resizeMouseDown(e)} className="resize"></div>;
  }
}
