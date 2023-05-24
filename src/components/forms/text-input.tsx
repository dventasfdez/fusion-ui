import React from "react";
import { FormContext } from "./form";
import BaseInput from "./base-input";

class TextInput extends BaseInput {
  type = "TextInput";
  //Rest of the functions and properties exist in baseInput, who's shared accross all form inputs.
  //They can be overrided using the same name and params type.
  // searchIcon = this.props.icon ? <span className="material-icons input-icon-box search-icon">search</span> : null;
  valuesNotAllowed: any;
  constructor(props: any) {
    super(props);
    this.onPressKey = this.onPressKey.bind(this);
    this.valuesNotAllowed = this.props.valuesNotAllowed || [null, undefined];
  }

  onPressKey(e: any) {
    if (this.props.preventSubmit && e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }

  getValidValue(_value: any) {
    const fallbackValue = this.props.defaultValue ?? "";
    let parsedValue = _value;
    if (this.props?.type === "number") {
      parsedValue = parseInt(_value);
      if (isNaN(parsedValue) || parsedValue < this.props.min || parsedValue > this.props?.max) return fallbackValue;
    }
    const _isValid = !this.valuesNotAllowed?.includes(parsedValue);
    return _isValid ? _value : fallbackValue;
  }

  render() {
    this.processCSSClasses();
    return (
      <div className={`input-wrapper ${this.validationClass} ${this.loadingClass} ${this.props.className || ""}`}>
        {this.renderInputLabel()}
        <div className="input-container">
          <input
            ref={this.inputRef}
            id={this.props.id}
            onChange={this.onChange}
            onBlur={this.props.onBlur}
            disabled={this.state.disabled}
            readOnly={this.state.readOnly}
            type={this.props.type}
            placeholder={this.props.placeholder}
            name={this.props.name}
            value={this.getValidValue(this.state.value)}
            autoComplete={this.props.autoComplete}
            onKeyPress={this.onPressKey}
            onKeyDown={this.onPressKey}
            onKeyUp={this.onPressKey}
            min={this.props.min}
            max={this.props.max}
            step={this.props.step}
          />
          {this.props.icon && <span className="material-icons input-icon-box">{this.props.icon}</span>}
        </div>
        {this.renderErrorMessage()}
      </div>
    );
  }
}

TextInput.contextType = FormContext;
export default TextInput;
