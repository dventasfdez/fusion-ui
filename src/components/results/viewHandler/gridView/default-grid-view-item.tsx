import React, { Component } from "react";

interface DefaultGridViewItemProps {
  item: any;
  columns: any[];
}
export default class DefaultGridViewItem extends Component<DefaultGridViewItemProps> {
  render() {
    const self = this;
    return (
      <tr>
        {this.props.columns.map((col, index) => {
          if (col.children) {
            return col.children.map((c: any, i: number) => {
              return <td key={i}>{self.props.item[c.columnKey]}</td>;
            });
          } else {
            return <td key={index}>{self.props.item[col.columnKey]}</td>;
          }
        })}
      </tr>
    );
  }
}
