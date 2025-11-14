import React, { useMemo, useState } from "react";
import Calendar, { CalendarProps } from "../calendar/calendar";
import Dropdown, { DropdownButton, DropdownMenu } from "../dropdown/dropdown";
import { useDevice } from "../../hooks/useDevice/useDevice";
import Input, { InputProps } from "../input/input";
import Icon from "../icon/icon";
import DatePickerRange, { DatePickerRangeProps } from "./range";
import clsx from "clsx";

type DatePickerMode = "single" | "multiple" | "range";
type DatePickerValue = number | number[];
type DatePickerSingleMultipleProps = InputProps & {
  locale: Intl.LocalesArgument;
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
  mode?: Exclude<DatePickerMode, "range">;
  /**
   * Return the value of select
   */
  onChange?: (value: DatePickerValue) => void;
  calendar?: CalendarProps;
};

type DatePickerRangeModeProps = DatePickerRangeProps & {
  mode: "range";
};

type DatePickerProps = DatePickerSingleMultipleProps | DatePickerRangeModeProps;

const DatePicker: React.FC<DatePickerProps> = (props: DatePickerProps) => {
  if (props.mode === "range") {
    const { mode, ...rangeProps } = props;
    return <DatePickerRange {...rangeProps} />;
  }

  const {
    name,
    format,
    locale = navigator.language,
    label,

    placeholder = format?.calendar,

    required,

    readOnly,

    disabled,

    error,

    defaultValue,

    className,
    mode: modeProp,

    onChange,
    calendar: calendarProps,
  } = props;
  const mode: Exclude<DatePickerMode, "range"> = modeProp ?? "single";

  const { isMobile } = useDevice();

  const getValueStr = (_value: number | number[]) => {
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
      }
      return Intl.DateTimeFormat(locale, format).format(_value as number);
    }
    return "";
  };

  const [value, setValue] = useState<number | number[]>(
    defaultValue ? defaultValue : mode === "multiple" ? [] : 0
  );
  const [errorState, setErrorState] = useState<boolean>(error ? error : false);
  const [inputValue, setInputValue] = useState<string>(
    defaultValue ? getValueStr(defaultValue) : ""
  );

  const calendar = useMemo(() => {
    let selectedDates: number[] = [];
    let _defaultDate: number | undefined = undefined;
    if (value)
      switch (mode) {
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
        className="datepicker-calendar-wrapper"
        minDate={calendarProps?.minDate}
        maxDate={calendarProps?.maxDate}
        selectedDates={selectedDates}
        disabledDates={calendarProps?.disabledDates}
        onSelectDate={(date: number, e?: React.MouseEvent) =>
          selectCalendarDate(date, e)
        }
        defaultDate={_defaultDate}
        locale={locale}
      />
    );
  }, [mode, calendarProps, value, locale]);

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
      }
    }
  };

  const selectCalendarDate = (date: number, e?: React.MouseEvent) => {
    let _value: number | number[] = value;

    switch (mode) {
      case "single":
        _value = date !== value ? date : 0;
        setInputValue(getValueStr(_value));
        break;
      case "multiple":
        e?.stopPropagation();
        e?.nativeEvent.stopImmediatePropagation();
        {
          const currentValue = Array.isArray(value) ? value : [];
          if (date === -1) {
            _value = [];
          } else if (currentValue.find((element: number) => element === date)) {
            _value = currentValue.filter((element: number) => element !== date);
          } else {
            _value = [...currentValue, date];
          }
        }
        setInputValue(getValueStr(_value));
        break;
    }

    setValue(_value);

    if (typeof onChange === "function") onChange(_value);
  };

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
      className={clsx("datepicker-wrapper", className)}
      disabled={disabled}
      keepShown={mode === "multiple"}
    >
      <DropdownButton className="datepicker-container">{input}</DropdownButton>
      <DropdownMenu>{calendar}</DropdownMenu>
    </Dropdown>
  );
};

export default DatePicker;
