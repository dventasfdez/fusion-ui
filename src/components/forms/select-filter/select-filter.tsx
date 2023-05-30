import React from "react";
import Option from "./select-filter-option";
import Selections from "./_select-filter-selections";
import BaseInput from "../base-input";
import { FormContext } from "../form";
import Dropdown, { DropdownButton, DropdownMenu } from "../../dropdown/dropdown";

import DropdownSelectMenu from "./_select-filter-dropdown-menu";
import Loader from "../../loader/loader";

export { default as Option } from "./select-filter-option";

export interface IProps {
  children?: any;
  name?: string;
  type?: string;
  className?: string;
  value?: any;
  tooltip?: string;
  emptyOption?: boolean;
  showSelectAllOption?: boolean;
  hideSelections?: boolean;
  onFilterChange?: Function; //to handle filter search change
  [others: string]: any;
}
export interface IState {
  children?: any;
  value?: any;
  filterValue?: any;
  [others: string]: any;
}
class SelectFilter extends BaseInput {
  type = "SelectFilter";
  state: Readonly<IState> = {
    showMenu: false,
    items: [],
    selectedItems: [],
    showClearIcon: false,
    value: this.props.value ? this.props.value : this.props.multiple ? [] : "",
    filterValue: "",
    defaultValue: this?.props?.defaultValue,
  };
  tooltip?: string = undefined;
  inputRef: any = React.createRef();
  wrapperRef: any = null;
  dropdownRef: any = React.createRef();
  hiddenInputRef: any = React.createRef();

  constructor(props: any) {
    super(props);
    this.state = {
      errors: this.props.errors,
      isValid: undefined,
      value: this.props.value ? this.props.value : this.props.multiple ? [] : "",
      validateOnChange: this.props.validateOnChange === false ? this.props.validateOnChange : true,
      disabled: this.props.disabled,
      readOnly: this.props.readOnly,
      loading: this.props.loading,
      placeholder: this.props.placeholder,
      defaultValue: this?.props?.defaultValue,
    };
    this._isMounted = false;

    this.type = "";
    this.change = this.change.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);
    this.onSelectItem = this.onSelectItem.bind(this);
  }

  setWrapperRef(node: any) {
    this.wrapperRef = node;
  }

  componentDidMount() {
    this._isMounted = true;
    if (this.context && typeof (this.context as any).addInputToContext === "function") {
      (this.context as any).addInputToContext(this);
    }

    const _defaultValue = this.props.isMultiple ? this.props.defaultValue || [] : this.props.defaultValue || "";
    this.setState({ value: this.props.value ?? _defaultValue });
    this.renderItems();
  }
  componentDidUpdate(prevProps: any, prevState: any) {
    if (this._isMounted) {
      if (this.props.value !== prevProps.value) {
        this.setState({ value: this.props.value });
      }
      if (this.props.defaultValue !== prevProps.defaultValue) {
        this.setState({ value: this.props.defaultValue });
      }
      if (this.props.disabled !== prevProps.disabled) {
        this.setState({ disabled: this.props.disabled });
      }
      if (this.props.readOnly !== prevProps.readOnly) {
        this.setState({ readOnly: this.props.readOnly });
      }
      if (this.props.loading !== prevProps.loading) {
        this.setState({ loading: this.props.loading });
      }
      if (this.props.tooltip !== prevProps.tooltip) {
        this.setState({ tooltip: this.props.tooltip });
      }
      if (this.props.errors !== prevProps.errors) {
        this.setState({ errors: this.props.errors });
      }
      if (prevProps.children !== this.props.children) {
        this.renderItems();
      }
      try {
        if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
          //just for you sonar =),  to avoid wrong code smell for prevState, needed for checkbox input
        }
      } catch (error) {}
    }
  }

  calculateDropdownPosition = () => {
    if (this.wrapperRef) {
      const position = this.wrapperRef.getBoundingClientRect();
      const top = position.bottom + document.documentElement.scrollTop;
      let left = position.left;
      let outerWidth = this.wrapperRef.offsetWidth;
      return {
        top: top,
        left: left,
        width: outerWidth,
        right: "auto",
        bottom: "auto",
      };
    }
  };

  onRemoveItem = (value: string | string[]) => {
    let newValues: any;
    if (this.props.multiple !== true) {
      newValues = "";
    } else {
      const currentStateValue = this.state.value;
      if (typeof currentStateValue === "object") {
        if (typeof value === "object" && value?.length) {
          newValues = this.state.value && this.state.value.length && this.state.value.filter((existingValue: string) => value.indexOf(existingValue) === -1);
        } else {
          newValues = this.state.value && this.state.value.length && this.state.value.filter((existingValue: string) => existingValue !== value);
        }
      } else if (typeof currentStateValue === "string") {
        newValues = [];
      }
    }
    const fakeEvent = {
      target: { ...this.inputRef, value: newValues },
    };

    this.setState({ value: newValues }, async () => {
      this.processChange(newValues, fakeEvent);
    });
  };

  onSelectItem = (value: string | string[]) => {
    const fakeEvent = {
      target: { ...this.inputRef, value: value },
    };
    if (this.props.multiple !== true) {
      this.setState({ /* showMenu: false, */ value: value }, async () => {
        this.processChange(value, fakeEvent);
      });
    } else {
      let values = typeof this.state.value === "object" ? this.state.value : this.state.value ? [this.state.value] : [];
      if (typeof value === "object") {
        values = [...new Set([...values, ...value])]; //using set avoids duplicated values in the same array
      } else {
        if (!values?.some((existingValue: string) => existingValue === value)) {
          values.push(value);
        }
      }

      this.setState({ value: values }, async () => {
        this.processChange(values, fakeEvent);
      });
    }
  };

  deleteTextInput = () => {
    this.setState({ showClearIcon: false, filterValue: null });
  };

  filterItems = (event: any) => {
    const showClearIcon = event.target.value.length > 0 ? true : false;
    this.setState({ filterValue: event.target.value, showClearIcon: showClearIcon /* showMenu: true */ });
    this.renderItems(event.target.value.toUpperCase());
    if (this.props.onFilterChange) {
      this.props.onFilterChange(event);
    }
  };

  renderItems(filterValue = null) {
    let self = this;
    let items: any[] = [];
    let children: any = self.props.children;
    let index = 0;
    if (self.props.children && children?.length) {
      children?.forEach((item: any) => {
        if (item.type === Option) {
          let isSelected: boolean = false;
          if (self.props.value) {
            if (self.props.multiple !== true) {
              isSelected = self.props.value && self.props.value.length === item.props?.value ? true : false;
            } else {
              isSelected =
                self.props.value && self.props.value.length && typeof self.props.value === "object" && typeof self.props.value.find((a: any) => a.value === item.props?.value) !== "undefined"
                  ? true
                  : false;
            }
          }
          let itemCustom: any = React.cloneElement(item, {
            key: index,
            onSelectItem: self.onSelectItem,
            selected: isSelected,
            index: index,
          });
          if (filterValue) {
            let matchesValue = itemCustom.props.value ? itemCustom.props.value.toUpperCase().includes(filterValue) : false;
            let matchesLabel = itemCustom.props.value ? itemCustom.props.label.toUpperCase().includes(filterValue) : false;
            if (matchesValue || matchesLabel) {
              items.push(itemCustom);
            }
          } else {
            items.push(itemCustom);
          }
          index++;
        }
      });
    }
    this.setState({ items: items });
  }

  renderMenu() {
    return (
      <DropdownSelectMenu
        className={this.props.className || ""}
        dropdownRef={this.dropdownRef}
        onSelectItem={this.onSelectItem}
        onRemoveItem={this.onRemoveItem}
        showSelectAllOption={this.props.showSelectAllOption}
        dropdownPosition={this.state.dropdownPosition}
        items={this.state.items}
        mode={this.props.mode}
        value={this.state.value}
        multiple={this.props.multiple}
      />
    );
  }

  renderHiddenInput() {
    const children: any = this.props.children;
    let value: any = this.state.value ? this.state.value : "";

    if (this.props.multiple) {
      value = this.state.value ? this.state.value : [];
      if (typeof value === "string") {
        value = [value];
      }
    }
    return (
      <div className="display_none">
        <select
          onChange={() => {
            return;
          }}
          disabled={this.state.disabled}
          name={this.props.name}
          multiple={this.props.multiple}
          ref={this.inputRef}
          value={value}
        >
          {this.props.emptyOption && <option value=""></option>}
          {children?.length &&
            children?.map((option: any, index: number) => {
              return (
                <option key={index} value={option.props?.value}>
                  {option.props?.label}
                </option>
              );
            })}
        </select>
      </div>
    );
  }

  renderErrorMessage = () => {
    const input = this.hiddenInputRef && this.hiddenInputRef.current;
    if (input && input.state && input.state.errors) {
      return <div className="input-error">{input.state.errors[0]}</div>;
    } else if (this.state.errors?.length > 0) {
      return <div className="input-error">{this.state.errors[0]}</div>;
    }
  };

  // Review the code removed in comments
  render() {
    this.processCSSClasses();

    return (
      <div className={`input-wrapper ${this.validationClass}  ${this.loadingClass} ${this.props.className}`}>
        {this.renderInputLabel()}
        <Dropdown>
          <DropdownButton disabled={this.state.disabled}>
            <div className="input-container">
              <input
                placeholder={this.state.placeholder}
                ref={this.inputRef}
                type="text"
                value={this.state.filterValue === undefined ? "" : this.state.filterValue}
                onChange={this.filterItems}
                disabled={this.props.disabled}
                data-testid={this.props?.["data-testid"] || this.props.id || "select-filter"}
              />
              {this.state.loading ? <Loader spinner className="input-icon" /> : <span className="material-icons input-icon">search</span>}
            </div>
          </DropdownButton>
          <DropdownMenu>{this.renderMenu()}</DropdownMenu>
        </Dropdown>
        {this.renderHiddenInput()}
        {!this.props.hideSelections && this.state.value && (
          <Selections name={this.props.name} onRemoveItem={this.onRemoveItem} items={this.props.children} value={this.state.value} disabled={this.props.disabled} />
        )}
        {this.renderErrorMessage()}
      </div>
    );
  }
}

SelectFilter.contextType = FormContext;
export default SelectFilter;
