import React, { createRef } from "react";
import BaseInput from "./base-input";
import { FormContext } from "./form";

export interface INumberInputProps {
  disabled?: boolean;
  className?: string;
  error?: boolean;
  required?: boolean;
  defaultValue?: number;
  boundaries?: {
    max: number;
    min: number;
  };

  [others: string]: any;
}
class NumberInput extends BaseInput {
  constructor(props: INumberInputProps) {
    super(props);
    const { disabled, className, error, required, boundaries, placeholder, label, name, rest, defaultValue } = props;
    this.state = {
      ...this.state,
      boundaries: boundaries,
      error: error,
      disabled: disabled,
      className: className,
      required: required,
      placeholder: placeholder,
      label: label,
      rest: { ...rest },
      name: name,
      value: defaultValue ? String(defaultValue) : "0",
    };
  }

  handleDecrease = () => {
    let value = this.state.value ?? "0";
    const newValue = +value - 1;
    this.processChange(newValue as any, { target: { value: newValue } });

    if (this.props.customOnChange) this.props.customOnChange(newValue.toString());
    this.setState({ value: newValue.toString() });
  };

  handleIncrease = () => {
    let value = this.state.value || "0";
    const newValue = +value + 1;
    this.processChange(newValue as any, { target: { value: newValue } });
    if (this.props.customOnChange) this.props.customOnChange(newValue.toString());
    this.setState({ value: newValue.toString() });
  };

  render() {
    const { disabled, className, placeholder, value, name } = this.state;

    this.processCSSClasses();
    return (
      <div className={`input-wrapper ${className ?? ""} ${this.validationClass}`}>
        {this.renderInputLabel()}

        <div className="input-container">
          <button disabled={disabled} data-testid={this.state["data-testid"] + "-decrease"} onClick={this.handleDecrease} className="input-number-minus" type="button">
            -
          </button>
          <input
            ref={this.inputRef}
            value={value}
            onChange={this.onChange}
            type="number"
            disabled={disabled}
            data-testid={this.state["data-testid"] + "-input"}
            name={name}
            placeholder={placeholder}
          />
          <button disabled={disabled} data-testid={this.state["data-testid"] + "-increase"} onClick={this.handleIncrease} className="input-number-plus" type="button">
            +
          </button>
        </div>

        {this.renderErrorMessage()}
      </div>
    );
  }
}

NumberInput.contextType = FormContext;
export default NumberInput;
