import React, { Component } from "react";
export interface IProps {
  [others: string]: any;
}
class SelectItem extends Component<IProps> {
  onSelectItem = () => {
    if (this.props.selected) {
      this.props.onRemoveItem(this.props.value);
    } else {
      this.props.onSelectItem(this.props.value);
    }
  };
  render() {
    return (
      <>
        <li className={this.props.selected ? "select-filter-item  active" : "select-filter-item"} onClick={this.onSelectItem}>
          {this.props.label}
        </li>
      </>
    );
  }
}

export default SelectItem;
