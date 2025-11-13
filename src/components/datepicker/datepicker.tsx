import React, { useMemo, useState, MouseEvent } from "react";
import Calendar from "../calendar/calendar";
import Dropdown, { DropdownButton, DropdownMenu } from "../dropdown/dropdown";
import { useDevice } from "../../hooks/useDevice/useDevice";
import Input from "../input/input";
import Icon from "../icon/icon";

type DatePickerMode = "single" | "multiple" | "range";
type DatePickerValue = number | number[];

export interface IDatePickerProps {
  /**
   * Define if datepicker is read only in mode simple or multiple
   */
  readOnly?: boolean;
  /**
   * Define if range start is read only in mode range
   */
  readOnlyStart?: boolean;
  /**
   * Define if range end is read only in mode range
   */
  readOnlyEnd?: boolean;

  /**
   * Define if datepicker is disabled in mode simple or multiple
   */
  disabled?: boolean;
  /**
   * Define if range start is disabled in mode range
   */
  disabledStart?: boolean;
  /**
   * Define if range end is disabled in mode range
   */
  disabledEnd?: boolean;

  /**
   * Define if datepicker is required in mode simple or multiple
   */
  required?: boolean;
  /**
   * Define if range start is required in mode range
   */
  requiredStart?: boolean;
  /**
   * Define if range end is required in mode range
   */
  requiredEnd?: boolean;

  /**
   * Define if datepicker have an error in mode simple or multiple
   */
  error?: boolean;
  /**
   * Define if range start have an error in mode range
   */
  errorStart?: boolean;
  /**
   * Define if range end have an error in mode range
   */
  errorEnd?: boolean;

  /**
   * Set label for datepicker on mode simple or multiple
   */
  label?: string;
  /**
   * Set label for start datepicker in mode range
   */
  labelStart?: string;
  /**
   * Set label for end datepicker in mode range
   */
  labelEnd?: string;

  /**
   * Set placeholder for datepicker
   */
  placeholder?: string;
  /**
   * Set placeholder for start datepicker in mode range
   */
  placeholderStart?: string;
  /**
   * Set placeholder for end datepicker in mode range
   */
  placeholderEnd?: string;

  /**
   * Set different classes for datepicker component
   */
  className?: string;
  /**
   * Set the name of value in a form
   */
  name: string;
  /**
   * Set the value of date picker
   */
  defaultValue?: DatePickerValue;
  /**
   * Change the date format to show the dates. This attribute also affects the way dates are entered in the different inputs.
   */
  format?: Intl.DateTimeFormatOptions;
  /**
   * Change mode of date picker.
   */
  mode?: DatePickerMode;
  /**
   * Return the value of select
   */
  onChange?: (value: DatePickerValue) => void;

  /**
   * Is the minimum date we will can select
   */
  minDate?: number;
  /**
   * Is the maximum date we will can select
   */
  maxDate?: number;
  /**
   * Is the disable dates in calendar
   */
  disabledDates?: number[];
  locale?: Intl.LocalesArgument;

  [others: string]: any;
}

const DatePicker: React.FC<IDatePickerProps> = (props: IDatePickerProps) => {
  const {
    name,
    format,
    locale = navigator.language,
    label,
    labelStart,
    labelEnd,

    placeholder = format?.calendar,
    placeholderStart = format?.calendar,
    placeholderEnd = format?.calendar,

    required,
    requiredEnd,
    requiredStart,

    readOnly,
    readOnlyEnd,
    readOnlyStart,

    disabled,
    disabledEnd,
    disabledStart,

    error,
    errorEnd,
    errorStart,

    defaultValue,

    className,
    mode = "single",
    minDate,
    maxDate,
    disabledDates,

    onChange,

    ...rest
  } = props;

  const { isMobile } = useDevice();

  const getValueStr = (_value: number | number[], range?: "start" | "end") => {
    console.log("🚀🚀🚀 getValueStr", _value);
    if (_value) {
      if (mode === "multiple") {
        let _multipleValueStr = "";
        (_value as number[]).forEach(
          (_val: number, _idx: number) =>
            (_multipleValueStr += `${Intl.DateTimeFormat(locale, format).format(
              _val
            )}${(_value as number[])[_idx + 1] ? ", " : ""}`)
        );
        return _multipleValueStr;
      } else if (mode === "range") {
        if (_value && (_value as number[]).length) {
          if (range === "start")
            return (_value as number[])[0]
              ? Intl.DateTimeFormat(locale, format).format(
                  (_value as number[])[0]
                )
              : "";
          else if (range === "end")
            return (_value as number[])[1]
              ? Intl.DateTimeFormat(locale, format).format(
                  (_value as number[])[1]
                )
              : "";
        }
      }
      return Intl.DateTimeFormat(locale, format).format(_value as number);
    }
    return "";
  };

  const [value, setValue] = useState<number | number[]>(
    defaultValue
      ? defaultValue
      : mode === "range" || mode === "multiple"
      ? []
      : 0
  );
  const [errorState, setErrorState] = useState<boolean>(error ? error : false);
  const [inputValue, setInputValue] = useState<string>(
    (mode === "single" || mode === "multiple") && defaultValue
      ? getValueStr(defaultValue)
      : ""
  );
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  const [inputStartValue, setInputStartValue] = useState<string>(
    mode === "range" && defaultValue ? getValueStr(defaultValue, "start") : ""
  );
  const [errorRangeStart, setErrorRangeStart] = useState(
    errorStart ? errorStart : false
  );
  const [inputEndValue, setInputEndValue] = useState<string>(
    mode === "range" && defaultValue ? getValueStr(defaultValue, "end") : ""
  );
  const [errorRangeEnd, setErrorRangeEnd] = useState(
    errorEnd ? errorEnd : false
  );

  const calendar = useMemo(() => {
    let selectedDates: number[] = [];
    let _defaultDate: number | undefined = undefined;
    if (value)
      switch (mode) {
        case "range":
          if (
            typeof value === "object" &&
            value.length &&
            (!errorRangeStart || !errorRangeEnd)
          ) {
            const _valueMin = value[0];
            selectedDates = value;
            _defaultDate = _valueMin;
          }
          break;
        case "multiple":
          selectedDates = value as number[];
          _defaultDate = selectedDates[0];
          break;
        case "single":
        default:
          selectedDates = [value as number];
          _defaultDate = value as number;
          break;
      }

    return (
      <Calendar
        id={`datepicker-calendar-${mode}`}
        data-testid={
          rest && rest["data-testid"]
            ? `${rest["data-testid"]}-calendar`
            : undefined
        }
        className="datepicker-calendar-wrapper"
        minDate={minDate}
        maxDate={maxDate}
        selectedDates={selectedDates}
        disabledDates={disabledDates}
        onSelectDate={(date: number, e?: React.MouseEvent) =>
          selectCalendarDate(date, false, undefined, e)
        }
        defaultDate={_defaultDate}
        locale={locale}
        range={mode === "range"}
      />
    );
  }, [mode, minDate, maxDate, disabledDates, value, locale]);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e.currentTarget) {
      const _value: string = e.currentTarget.value;
      let _date: number | undefined = undefined;
      let _datesStr;
      let _datesVal;

      switch (mode) {
        case "single":
          _date = new Date(_value).valueOf();
          if (!_date) {
            setErrorState(true);
            selectCalendarDate(0);
          } else {
            setErrorState(false);
            selectCalendarDate(_date);
          }
          setInputValue(_value);
          break;
        case "multiple":
          if (_value) {
            _datesStr = _value.replaceAll(" ", "").split(",");

            _datesVal = _datesStr.map((_dateStr: string) =>
              new Date(_dateStr).valueOf()
            );

            _datesVal.forEach((_dateVal: number) => {
              if (!_dateVal) {
                setErrorState(true);
              } else {
                setErrorState(false);
                selectCalendarDate(_dateVal);
              }
            });
          } else {
            setErrorState(false);
            selectCalendarDate(-1);
          }

          setInputValue(_value);
          break;
        case "range":
          if (e.target && e.target.name) {
            const _name = e.target.name.split(".")[1];
            if (_value) {
              _date = new Date(_value).valueOf();
              if (_name === "start") {
                if (!_date) {
                  setErrorRangeStart(true);
                } else {
                  setErrorRangeStart(false);
                  selectCalendarDate(_date, true, "start");
                }
                setInputStartValue(_value);
              } else if (_name === "end") {
                if (!_date) {
                  setErrorRangeEnd(true);
                } else if (
                  _date &&
                  (value as number[]).length &&
                  (value as number[])[0] > _date
                ) {
                  setErrorRangeEnd(true);
                } else {
                  setErrorRangeEnd(false);
                  selectCalendarDate(_date, true, "end");
                }
                setInputEndValue(_value);
              }
            } else {
              if (_name === "start") {
                setErrorRangeStart(false);
                selectCalendarDate(0, true, "start");
              } else if (_name === "end") {
                setErrorRangeEnd(false);
                selectCalendarDate(0, true, "end");
              }
            }
          }

          break;
      }
    }
  };

  const selectCalendarDate = (
    date: number,
    fromInputs?: boolean,
    range?: "start" | "end",
    e?: React.MouseEvent
  ) => {
    let _value: number | number[] = value;

    switch (mode) {
      case "single":
        if (date !== _value) _value = date;
        else _value = 0;
        setInputValue(getValueStr(_value));
        break;
      case "multiple":
        e?.stopPropagation();
        e?.nativeEvent.stopImmediatePropagation();
        _value = _value as number[];
        if (date === -1) {
          _value = [];
        } else if (_value) {
          if (_value.find((element: any) => element === date)) {
            _value = _value.filter((element: any) => element !== date);
          } else {
            _value.push(date);
          }
        }
        setInputValue(getValueStr(_value));
        break;
      case "range":
        e?.stopPropagation();
        e?.nativeEvent.stopImmediatePropagation();
        _value = _value as number[];
        if (fromInputs) {
          if (date) {
            if (range === "start") {
              if (_value && _value.length) {
                if (_value.length === 2) {
                  const _valueEndDate = _value[1];
                  const _newDate = date;
                  if (_valueEndDate > _newDate) {
                    _value = [_newDate, _valueEndDate];
                  } else {
                    _value = [_newDate];
                  }
                } else {
                  _value = [date];
                }
              } else {
                _value = [date];
              }
            } else if (range === "end") {
              if (_value && _value.length) {
                const _valueStartDate = _value[0];
                const _newDate = date;
                if (_valueStartDate < _newDate) {
                  _value = [_valueStartDate, _newDate];
                } else {
                  _value = [Date.now(), _newDate];
                }
              } else {
                _value = [Date.now(), date];
              }
            }
          } else {
            if (range === "start") {
              _value.splice(0, 1);
            } else if (range === "end") {
              _value.splice(1, 1);
            }
          }
        } else {
          if (_value.length) {
            const _valueInitDate = _value[0];
            const _valueEndDate = _value[1];
            const _newDate = date;
            if (_value.length === 2) {
              if (date === _valueInitDate) {
                _value = [_valueEndDate];
              } else if (date === _valueEndDate) {
                _value = [_valueInitDate];
              } else {
                _value = [_newDate];
              }
            } else {
              if (_valueInitDate !== _newDate) {
                if (_valueInitDate < _newDate) {
                  _value.push(_newDate);
                } else {
                  _value = [_newDate, _valueInitDate];
                }
              } else {
                _value = [];
              }
            }
          } else {
            _value = [date];
          }
        }

        if (_value && _value.length) {
          if (_value.length > 1) {
            setInputStartValue(getValueStr(_value, "start"));
            setInputEndValue(getValueStr(_value, "end"));
          } else {
            setInputStartValue(getValueStr(_value, "start"));
            setInputEndValue("");
          }
        } else {
          if (range === "start") setInputStartValue("");
          if (range === "end") setInputEndValue("");
        }
        break;
    }
    setValue(_value);

    if (typeof onChange === "function") onChange(_value);
  };

  const onClickInputRange = (e: MouseEvent<HTMLInputElement>) => {
    if (showCalendar) e.stopPropagation();
  };

  const inputs = useMemo(
    () => (
      <>
        <Input
          label={labelStart}
          error={errorRangeStart}
          name={`${name}.start`}
          className="datepicker"
          placeholder={placeholderStart}
          type="text"
          value={inputStartValue}
          required={requiredStart}
          disabled={disabledStart}
          readOnly={readOnlyStart}
          onChange={onChangeInput}
          onClick={onClickInputRange}
          icon={!isMobile ? <Icon name="calendar_today" /> : undefined}
        />
        <Input
          label={labelEnd}
          error={errorRangeEnd}
          name={`${name}.end`}
          className="input datepicker"
          placeholder={placeholderEnd}
          type="text"
          value={inputEndValue}
          required={requiredEnd}
          disabled={disabledEnd}
          readOnly={readOnlyEnd}
          onChange={onChangeInput}
          onClick={onClickInputRange}
          icon={!isMobile ? <Icon name="calendar_today" /> : undefined}
        />
      </>
    ),
    [
      name,
      isMobile,
      labelStart,
      errorRangeStart,
      placeholderStart,
      inputStartValue,
      requiredStart,
      disabledStart,
      readOnlyStart,
      labelEnd,
      errorRangeEnd,
      placeholderEnd,
      inputEndValue,
      requiredEnd,
      disabledEnd,
      readOnlyEnd,
    ]
  );

  const input = useMemo(
    () => (
      <Input
        label={label}
        error={errorState}
        name={name}
        className="datepicker"
        placeholder={placeholder}
        type="text"
        value={inputValue}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        onChange={onChangeInput}
        icon={!isMobile ? <Icon name="calendar_today" /> : undefined}
      />
    ),
    [
      mode,
      label,
      name,
      placeholder,
      inputValue,
      required,
      disabled,
      readOnly,
      errorState,
      isMobile,
    ]
  );

  return (
    <Dropdown
      className={`datepicker-wrapper ${className || ""}`}
      onChangeToggleMenu={(state: boolean) => setShowCalendar(state)}
      disabled={disabled || (mode === "range" && disabledStart && disabledEnd)}
    >
      <DropdownButton
        className={`datepicker-container${mode === "range" ? "_range" : ""}`}
        data-testid={
          rest && rest["data-testid"] ? rest["data-testid"] : undefined
        }
      >
        {mode === "range" ? inputs : input}
      </DropdownButton>
      <DropdownMenu>{calendar}</DropdownMenu>
    </Dropdown>
  );
};

export default DatePicker;
