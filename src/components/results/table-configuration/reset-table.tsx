import React, { Component } from "react";

interface ResetTableProps {
  handleResetTable: Function;
}
export default class ResetTable extends Component<ResetTableProps> {
  handleResetTable = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.props.handleResetTable();
  };

  render() {
    return (
      <>
        <button className="button-secondary small" onClick={this.handleResetTable}>
          <span className="material-icons left">undo</span> Reset All Fields
        </button>
      </>
    );
  }
}
