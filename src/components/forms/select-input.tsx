import React, { createRef, SyntheticEvent } from "react";
import { FormContext } from "./form";
import BaseInput from "./base-input";

class SelectInput extends BaseInput {
  type = "SelectInput";
  selectRef = createRef<HTMLSelectElement>();
  //Rest of the functions and properties exist in baseInput, who's shared accross all form inputs.
  //They can be overrided using the same name and params type.

  generateOptions(options: any[]) {
    return options.map((item: any, i: number) => {
      if ((item && item.value === undefined) || item.value === null) {
        return (
          <option key={i} value={item}>
            {item}
          </option>
        );
      } else {
        return (
          <option key={i} value={item.value}>
            {item.label}
          </option>
        );
      }
    });
  }

  // valueCanBeSet = (value: string | string[], e: SyntheticEvent | any = undefined) => {
  //   let isSettable = false;
  //   const option = this.findOption(value);
  //   if (option) isSettable = true;
  //   return isSettable;
  // };

  findOption = (value: string | string[]) => {
    let option: any;
    if (value === "" || value === undefined || value === null) {
      option = {};
    } else {
      //check for each "option" if the value matches the value we're attempting to set
      if (!this.props.options) {
        const _passedValueString = value?.toString();
        React.Children.forEach(this.props.children, (child: any) => {
          const valueAsString = child?.props?.value ? child?.props?.value?.toString() : "";
          if (valueAsString === _passedValueString || (typeof value === "object" && value.length && value.indexOf(valueAsString) !== -1)) {
            //if value matches the children props value then the value can be set
            if (option) option.push(child.props);
            else option = [child.props];
          }
        });
      } else {
        if (this.props.options && (this.props.options[0]?.label === null || this.props.options[0]?.label === undefined)) {
          if (this.props.options.indexOf(value) !== -1) option = { label: value, value: value };
        } else if (this.props.multiple) {
          const forceValueArray = typeof value === "string" ? [value] : value;
          forceValueArray.forEach((element: any) => {
            const optionFind = this.props.options.find((i: any) => i.value === element);
            if (optionFind) {
              if (option) option.push(optionFind);
              else option = [optionFind];
            }
          });
        } else {
          const optionFind = this.props.options.find((i: any) => i.value === value);
          if (optionFind) option = optionFind;
        }
      }
    }
    return option;
  };

  changeHiddenInput = (value: string | string[]) => {
    let _hiddenValue;
    const option = this.findOption(value);
    if (typeof option === "object" && option.length > 0) {
      _hiddenValue = option.map((i: any) => i?.label);
      _hiddenValue = _hiddenValue.join(",");
    } else {
      _hiddenValue = option?.label;
    }
    this.setState({ hiddenValue: _hiddenValue });
  };

  render() {
    this.processCSSClasses();
    let value: any = this.state.value ? this.state.value : "";
    if (this.props.multiple) {
      value = this.state.value ? this.state.value : [];
    }
    return (
      <div className={`input-wrapper ${this.validationClass} ${this.loadingClass} ${this.props.className ?? ""}`}>
        {this.renderInputLabel()}
        <select
          id={this.props.id}
          disabled={this.state.disabled}
          name={this.props.name}
          multiple={this.props.multiple}
          ref={this.selectRef}
          onChange={this.onChange}
          value={value}
          // onClick={() => {
          //   this.setState({ clicked: true });
          // }}
          className={this.props.selectClassName}
        >
          {this.state.children}
          {this.state.options && this.state.options.length > 0 && this.generateOptions(this.state.options)}
        </select>

        <input type="hidden" name={`${this.props.name}_label`} value={this.state.hiddenValue ?? ""} />
        {this.renderErrorMessage()}
      </div>
    );
  }
}

SelectInput.contextType = FormContext;
export default SelectInput;
