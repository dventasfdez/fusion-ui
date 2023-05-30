import React, { Component } from "react";
export interface IProps {
  [others: string]: any;
}
class SelectFilterOption extends Component<IProps> {
  onChangeItem = (e: any) => {
    if (this.props.selected) {
      this.props.onRemoveItem(this.props.value);
    } else {
      this.props.onSelectItem(this.props.value);
    }
  };

  onClickItemMultiple = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  onClickItem = (e: React.MouseEvent<HTMLLIElement>) => {
    // Avoid close
    if (this.props.multiple) {
      this.onClickItemMultiple(e);
    }
    // Do the action
    if (this.props.selected) {
      this.props.onRemoveItem(this.props.value);
    } else {
      this.props.onSelectItem(this.props.value);
    }
  };

  render() {
    const image = this.props.others?.image;

    return this.props.multiple ? (
      <li key={this.props.key} id={this.props.id} className="dropdown-item checkbox-container dropdown-item" onClick={this.onClickItemMultiple}>
        <input id={this.props.value} type="checkbox" checked={this.props.selected} onChange={this.onChangeItem} />
        <label htmlFor={this.props.value} onClick={(e) => e.stopPropagation()}>
          {this.props.label} {image ? <img src={image?.src} className={image?.className} alt=" " /> : ""}
        </label>
      </li>
    ) : (
      <li key={this.props.key} id={this.props.id} className={`dropdown-item ${this.props.selected ? "selected" : ""}`} onClick={this.onClickItem}>
        {this.props.label}
      </li>
    );
  }
}

export default SelectFilterOption;
