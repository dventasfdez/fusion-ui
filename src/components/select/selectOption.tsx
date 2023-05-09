import React from 'react';
import {useSelect} from './select';
export interface ISelectOptionProps {
  id?: string;
  value: any;
  label: string;
  [others: string]: any;
}

const SelectOption: React.FC<ISelectOptionProps> = (props) => {
  const {id, value, label, ...rest} = props;
  const {selectedValue, filterValue, multiple, onSelectItem, onRemoveItem} = useSelect();

  const isSelected = () => {
    if (selectedValue) {
      if (!multiple) {
        return selectedValue === value;
      }
      return typeof selectedValue === 'object' && typeof selectedValue.find((_val: any) => _val === value) !== 'undefined';
    }
  };

  const isFiltered = () => {
    if (filterValue) {
      const matchesLabel = label.toUpperCase().includes(filterValue.toUpperCase());
      if (matchesLabel) return true;
      return false;
    }
    return true;
  };
  const onChangeItem = () => {
    if (isSelected()) {
      onRemoveItem(value);
    } else {
      onSelectItem(value);
    }
  };

  const onClickItem = () => {
    if (isSelected()) {
      onRemoveItem(value);
    } else {
      onSelectItem(value);
    }
  };

  return isFiltered() ? (
    multiple ? (
      <li className="dropdown-item checkbox-container dropdown-item">
        <input id={id || value} type="checkbox" checked={isSelected()} onChange={onChangeItem} {...rest} />
        <label htmlFor={id || value}>{label}</label>
      </li>
    ) : (
      <li id={id} className={`dropdown-item ${isSelected() ? 'selected' : ''}`} onClick={onClickItem} {...rest}>
        {label}
      </li>
    )
  ) : null;
};

export default SelectOption;
