import React, { ChangeEvent, useMemo, useState } from "react";
import Calendar, { CalendarProps } from "../calendar/calendar";
import Dropdown, { DropdownButton, DropdownMenu } from "../dropdown/dropdown";
import { useDevice } from "../../hooks/useDevice/useDevice";
import Input, { InputProps } from "../input/input";
import Icon from "../icon/icon";
import DatePickerRange, { DatePickerRangeProps } from "./range";
import clsx from "clsx";
import {
  dateFromFormat,
  getFormatStr,
  parseDateFromStrWithFormat,
} from "@/helpers/calendar/calendarHelper";

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
    format = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    },
    locale = navigator.language,
    label,

    placeholder = getFormatStr(locale, format),

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

  const [value, setValue] = useState<number | number[]>(
    defaultValue ? defaultValue : mode === "multiple" ? [] : 0
  );
  const [errorState, setErrorState] = useState<boolean>(error ? error : false);

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
        onSelectDate={(date: number) => selectCalendarDate(date)}
        defaultDate={_defaultDate}
        locale={locale}
      />
    );
  }, [mode, calendarProps, value, locale]);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e && e.currentTarget) {
      let _datesStr;
      let _datesVal;

      switch (mode) {
        case "single":
          const _value = dateFromFormat(locale, format, e.currentTarget.value);
          if (!_value) {
            setErrorState(true);
            selectCalendarDate(0);
            return;
          }

          setErrorState(false);
          selectCalendarDate(_value?.valueOf());

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

          break;
      }
    }
  };

  const selectCalendarDate = (date: number) => {
    let _value: number | number[] = value;

    switch (mode) {
      case "single":
        _value = date !== value ? date : 0;

        break;
      case "multiple":
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
        value={
          value
            ? typeof value === "number"
              ? Intl.DateTimeFormat(locale, format).format(value)
              : value
                  .map((val) => Intl.DateTimeFormat(locale, format).format(val))
                  .join(", ")
            : undefined
        }
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
      value,
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
