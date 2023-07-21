import _ from "lodash";
import React, { Component } from "react";
import SelectFilterOption from "./select-filter-option";
import { sortFunction } from "../../../utilities/object-helper";
export interface IProps {
  [others: string]: any;
}
export default class DropdownMenu extends Component<IProps> {
  globalIndex: any;
  onSelectItem: any;
  arrowDirection: any;
  setItemPosition: any;
  render() {
    let self = this;
    let items: any[] = [];
    let allvalues: any[] = [];
    let index = 0;

    if (self.props.items) {
      self.props.items.forEach((item: any) => {
        if (item && item.type === SelectFilterOption) {
          let isSelected = false;
          if (self.props.mode === "single") {
            isSelected = self.props.value && self.props.value === item.props?.value;
          } else {
            const value = self.props.value && typeof self.props.value === "object" ? self.props.value : [self.props.value];
            isSelected = value && value.length && value.indexOf(item.props?.value) !== -1 ? true : false;
          }
          let itemCustom = React.cloneElement(item, {
            key: index,
            onSelectItem: self.props.onSelectItem,
            onRemoveItem: self.props.onRemoveItem,
            selected: isSelected,
            index: index,
            multiple: self.props.multiple,
          });
          items.push(itemCustom);
          allvalues.push(item.props?.value);
          index++;
        }
      });
    }
    if (self.props.items) {
      let sortedPropsValues: any = [];
      if (typeof self.props.value === "object" && self.props.items?.length) {
        sortedPropsValues = self.props.value;
      }
      let sortedAllValues: any = [];
      if (typeof allvalues === "object" && allvalues?.length) {
        sortedAllValues = allvalues;
      }

      const selectAllOptionIsChecked =
        self.props.showSelectAllOption && self.props.multiple && typeof self.props.value === "object" && typeof allvalues === "object" && _.isEqual(sortedPropsValues, sortedAllValues);

      return (
        <ul>
          {self.props.showSelectAllOption && self.props.multiple && (
            <SelectFilterOption
              multiple={true}
              selected={selectAllOptionIsChecked}
              onSelectItem={self.props.onSelectItem}
              onRemoveItem={self.props.onRemoveItem}
              value={allvalues}
              label="select.all.button"
            />
          )}

          {items}
        </ul>
      );
    } else {
      return (
        <div className="dropdown-item-icon">
          <span className="material-icons">error</span>
          <strong>Info:</strong> No results found
        </div>
      );
    }
  }
}
