import React from "react";

import { FormContext } from "./form";
import BaseInput from "./base-input";
import Calendar from "../calendar/calendar";

import { DateTime } from "luxon";
import Dropdown, { DropdownButton, DropdownMenu } from "../dropdown/dropdown";
import { getDatesBetween2Dates } from "../../helpers/calendar/calendarHelper";
export const datePickerMode = {
  SINGLE: "single",
  MULTIPLE: "multiple",
  RANGE: "range",
};

export interface IProps {
  name?: string;
  type?: string;
  className?: string;
  value?: string;
  disabled?: boolean;
  label?: string;
  errors?: string[];
  validations?: Function[];
  validateOnChange?: boolean;
  readOnly?: boolean;
  loading?: boolean;
  placeholder?: string;
  onChange?: Function;
  autoComplete?: string;
  [others: string]: any;
  //previous line avoids having to write specific component properties
}

export interface IState {
  errors?: string[];
  isValid?: boolean;
  value?: any;
  validateOnChange?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  loading?: boolean;
  [others: string]: any;
}

class DateInput extends BaseInput {
  state: Readonly<IState> = {
    errors: this.props.errors,
    isValid: undefined,
    value: this.props.value,
    validateOnChange: this.props.validateOnChange === false ? this.props.validateOnChange : true,
    disabled: this.props.disabled,
    readOnly: this.props.readOnly,
    loading: this.props.loading,
    dateFormat: this.props.dateFormat ? this.props.dateFormat : "yyyy-MM-dd",
    showCalendar: false,
    calendarPosition: null,
    forceRefresh: 0,
  };

  constructor(props: any) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
  }

  inputRef: any = React.createRef();
  wrapperRef: any = null;

  componentDidMount() {
    this._isMounted = true;

    let value = null;
    if (this.props.defaultValue) {
      if (Object.prototype.toString.call(this.props.defaultValue) === "[object Date]") {
        value = this.props.defaultValue ? DateTime.fromMillis(this.props.defaultValue).toFormat(this.state.dateFormat) : null;
      } else {
        value = this.props.defaultValue;
      }
    }

    this.setState({ value: value });
    if (this.context && typeof (this.context as any).addInputToContext === "function") {
      (this.context as any).addInputToContext(this);
    }
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.props.defaultValue !== prevProps.defaultValue) {
      this.setState({ value: this.props.defaultValue });
    }
    if (this.props.disabled !== prevProps.disabled) {
      this.setState({ disabled: this.props.disabled });
    }
    if (this.props.loading !== prevProps.loading) {
      this.setState({ loading: this.props.loading });
    }
  }

  setWrapperRef(node: any) {
    this.wrapperRef = node;
  }

  renderCalendar = () => {
    const self = this;
    let _selectedDates: any[] = [];
    let _activeDates: number[] | undefined;
    let _defaultDate: number | undefined = undefined;

    let value = this.state.value ? this.state.value : [];
    if (typeof value === "string") value = value.split(",");

    if (value && Object.prototype.toString.call(value) === "[object Array]") {
      value.forEach(function (item: any) {
        _selectedDates.push(typeof item === "number" ? DateTime.fromMillis(item) : DateTime.fromFormat(item, self.state.dateFormat));
      });

      if (self.props.mode === datePickerMode.MULTIPLE) {
        _defaultDate = _selectedDates[0];
      } else if (self.props.mode === datePickerMode.RANGE) {
        if (typeof value === "object" && value.length) {
          const _valueMin = _selectedDates[0];
          const _valueMax = _selectedDates[1];

          if (_valueMin && _valueMin.isValid && _valueMax && _valueMax.isValid) {
            _activeDates = getDatesBetween2Dates(_valueMin.valueOf(), _valueMax.valueOf());
          }
          _defaultDate = _valueMin;
        }
      } else {
        _defaultDate = _selectedDates[0];
      }
    }

    // Force get timestamp default value
    if (_defaultDate) _defaultDate = _defaultDate.valueOf();
    // Paint calendar

    return (
      <Calendar
        className="datepicker-calendar-wrapper"
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        selectedDates={_selectedDates}
        activeDates={_activeDates?.map((_aDate) => _aDate.valueOf())}
        disabledDates={this.props.disabledDates}
        onSelectDate={(date: number) => this.selectCalendarDate(DateTime.fromMillis(date).toJSDate())}
        defaultDate={_defaultDate}
      />
    );
  };

  selectCalendarDate = (date: Date) => {
    if (!this.props.mode || this.props.mode === datePickerMode.SINGLE) {
      let _value: string = "";
      _value = date ? DateTime.fromJSDate(date).toFormat(this.state.dateFormat) : "";
      this.processChange(_value, { target: this.inputRef.current });
    }
    if (this.props.mode === datePickerMode.MULTIPLE || this.props.mode === datePickerMode.RANGE) {
      let _value = this.state.value ? this.state.value : [];
      if (typeof _value === "string") _value = _value.split(",");
      if (this.props.mode === datePickerMode.RANGE) {
        if (_value.length !== 2) {
          _value.push(DateTime.fromJSDate(date).toFormat(this.state.dateFormat));
        } else {
          _value = [];
          _value.push(DateTime.fromJSDate(date).toFormat(this.state.dateFormat));
        }
      }

      if (this.props.mode === datePickerMode.MULTIPLE) {
        if (_value.find((element: any) => element === DateTime.fromJSDate(date).toFormat(this.state.dateFormat))) {
          _value = _value.filter((element: any) => element !== DateTime.fromJSDate(date).toFormat(this.state.dateFormat));
        } else {
          _value.push(DateTime.fromJSDate(date).toFormat(this.state.dateFormat));
        }
      }

      this.setState({ forceRefresh: this.state.forceRefresh + 1 }, () => {
        this.processChange(_value, { target: this.inputRef.current });
      });
    }
  };

  // Review the code removed in comments
  render() {
    this.processCSSClasses();
    let value = this.state.value ? this.state.value : "";
    console.log(value);
    if (Object.prototype.toString.call(value) === "[object Date]") {
      value = DateTime.fromJSDate(this.props.defaultValue).toFormat(this.state.dateFormat);
    }

    return (
      <div className={`input-wrapper ${this.validationClass} ${this.loadingClass} ${this.props.className ?? ""}`} ref={this.setWrapperRef}>
        <Dropdown className="datepicker-wrapper" forceRefresh={this.state.forceRefresh} keepShown={this.props.mode === datePickerMode.MULTIPLE || this.props.mode === datePickerMode.RANGE}>
          <DropdownButton className="datepicker-container" disabled={this.state.disabled}>
            {this.renderInputLabel()}
            <div className="input-container">
              <input
                disabled={this.state.disabled}
                ref={this.inputRef}
                onChange={this.onChange}
                type={this.props.mode === datePickerMode.MULTIPLE || this.props.mode === datePickerMode.RANGE ? "text" : "date"}
                placeholder={this.props.placeholder ?? this.state.format}
                name={this.props.name}
                value={value}
                autoComplete="off"
                readOnly={this.state.readOnly}
              />
              <span className="material-icons input-icon">calendar_today</span>
            </div>
            {this.renderErrorMessage()}
          </DropdownButton>
          <DropdownMenu>{this.renderCalendar()}</DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

DateInput.contextType = FormContext;
export default DateInput;
