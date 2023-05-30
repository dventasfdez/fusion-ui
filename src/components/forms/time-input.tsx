import React from "react";
import BaseInput from "./base-input";
import { FormContext } from "./form";

export interface ITimeInputProps {
  //Time type:
  time?: boolean;
  timeFormat?: boolean;
  timeBoundaries?: {
    min: string;
    max: string;
  };
  [others: string]: any;
}

class TimeInput extends BaseInput {
  constructor(props: ITimeInputProps) {
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
    let value = this.state.value || "0";
    const newValue = +value - 1;
    this.processChange(newValue as any, { target: { value: newValue } });
    const finalValue = this.handleBoundaries(newValue) ? newValue.toString() : value;
    if (this.props.customOnChange) this.props.customOnChange(finalValue);
    this.setState({ value: finalValue });
  };

  handleIncrease = () => {
    let value = this.state.value || "0";
    const newValue = +value + 1;
    this.processChange(newValue as any, { target: { value: newValue } });
    const finalValue = this.handleBoundaries(newValue) ? newValue.toString() : value;
    if (this.props.customOnChange) this.props.customOnChange(finalValue);
    this.setState({ value: finalValue });
  };

  handleBoundaries = (val: number) => {
    let boundaries = this.state.boundaries;
    if (boundaries) {
      if (boundaries.max < val || boundaries.min > val) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  handleTimeBoundaries = () => {
    const { timeFormat, timeBoundaries } = this.props;
    if (timeBoundaries) {
      if (timeFormat === "halfDay") {
        return { min: "01:00", max: timeBoundaries.max };
      } else {
        return { min: "00:00", max: timeBoundaries.max };
      }
    } else {
      return { min: timeFormat === "halfDay" ? "01:00" : "00:00", max: timeFormat === "halfDay" ? "12:00" : "24:00" };
    }
  };

  render() {
    const { error, disabled, className, label, required, placeholder, value, name } = this.state;
    const { time } = this.props;
    this.processCSSClasses();
    return (
      <div
        className={`number-input input-wrapper${disabled ? "_disabled" : ""} ${className || ""}
      ${error || this.handleBoundaries(+value!) ? "" : "error"}`}
        data-testid={this.state["data-testid"]}
      >
        {this.renderInputLabel()}

        <div className="input-number-container">
          <input
            value={value}
            onChange={this.onChange}
            type="time"
            min={this.handleTimeBoundaries().min}
            max={this.handleTimeBoundaries().max}
            placeholder="--:--"
            className="input-container"
            disabled={disabled}
            data-testid={this.state["data-testid"] + "-input"}
            name={name}
          />
        </div>
      </div>
    );
  }
}

TimeInput.contextType = FormContext;
export default TimeInput;
