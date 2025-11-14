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
  getLocalDateFromUTCDate,
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
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
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
      if (!e.currentTarget.value.trim()) {
        setErrorState(false);
        selectCalendarDate(-1);
        return;
      }

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
        case "multiple": {
          const dates = e.currentTarget.value.replaceAll(" ", "").split(",");
          const val = dates.map((_dateStr: string) =>
            dateFromFormat(locale, format, _dateStr)
          );

          if (val.some((date) => !date)) {
            setErrorState(true);
            return;
          }

          val.forEach((_dateVal) => {
            setErrorState(false);
            selectCalendarDate((_dateVal as Date).valueOf(), true);
          });

          break;
        }
      }
    }
  };

  const selectCalendarDate = (date: number, fromInput?: boolean) => {
    let _value: number | number[] = value;
    switch (mode) {
      case "single":
        if (date <= 0) {
          _value = 0;
        } else {
          _value = date !== value ? date : 0;
        }

        break;
      case "multiple":
        {
          const currentValue = Array.isArray(value) ? value : [];
          if (date === -1) {
            _value = [];
          } else if (currentValue.find((element: number) => element === date)) {
            if (!fromInput)
              _value = currentValue.filter(
                (element: number) => element !== date
              );
          } else {
            _value = [...currentValue, date];
          }
        }

        break;
    }

    setValue(_value);

    if (typeof onChange === "function") onChange(_value);
  };

  const dateFormatter = useMemo(
    () => new Intl.DateTimeFormat(locale, format),
    [locale, format]
  );

  const formattedInputValue = useMemo(() => {
    const formatTimestamp = (timestamp?: number) => {
      if (!timestamp) return "";
      const localDate = getLocalDateFromUTCDate(new Date(timestamp));
      return dateFormatter.format(localDate);
    };
    if (errorState) return undefined;

    if (Array.isArray(value) && !errorState) {
      const formatted = value
        .filter((val): val is number => typeof val === "number" && val > 0)
        .map(formatTimestamp)
        .filter(Boolean);
      return formatted.length ? formatted.join(", ") : undefined;
    }

    if (typeof value === "number" && value > 0) {
      const formatted = formatTimestamp(value);
      return formatted || undefined;
    }

    return "";
  }, [value, dateFormatter, errorState]);

  const input = useMemo(
    () => (
      <Input
        label={label}
        error={errorState}
        name={name}
        className="datepicker"
        placeholder={placeholder}
        type="text"
        value={formattedInputValue}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        onChange={onChangeInput}
        icon={!isMobile ? <Icon name="calendar_today" /> : undefined}
        onClick={(e) => {
          if (mode === "multiple" && showCalendar) {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
          }
        }}
      />
    ),
    [
      label,
      name,
      placeholder,
      formattedInputValue,
      required,
      disabled,
      readOnly,
      errorState,
      isMobile,
      onChangeInput,
    ]
  );

  return (
    <Dropdown
      className={clsx("datepicker-wrapper", className)}
      disabled={disabled}
      onChangeToggleMenu={(state: boolean) => setShowCalendar(state)}
      keepShown={mode === "multiple"}
    >
      <DropdownButton className="datepicker-container">{input}</DropdownButton>
      <DropdownMenu>{calendar}</DropdownMenu>
    </Dropdown>
  );
};

export default DatePicker;
