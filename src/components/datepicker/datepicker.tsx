import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
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
    locale: localeProp,
    label,

    placeholder: placeholderProp,

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

  const locale = useMemo<Intl.LocalesArgument>(() => {
    if (localeProp) return localeProp;
    if (typeof navigator !== "undefined") return navigator.language;
    return "en-US";
  }, [localeProp]);

  const placeholder = useMemo(
    () => placeholderProp ?? getFormatStr(locale, format),
    [placeholderProp, locale, format]
  );

  const { isMobile } = useDevice();

  const [value, setValue] = useState<number | number[]>(
    defaultValue !== undefined ? defaultValue : mode === "multiple" ? [] : 0
  );
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<boolean>(!!error);
  const [inputText, setInputText] = useState<string>("");

  useEffect(() => {
    if (defaultValue !== undefined) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (typeof error === "boolean") {
      setErrorState(error);
    }
  }, [error]);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.currentTarget) {
      const nextValue = e.currentTarget.value;
      setInputText(nextValue);

      if (!nextValue.trim()) {
        setErrorState(false);
        selectCalendarDate(-1);
        return;
      }

      switch (mode) {
        case "single": {
          const parsedDate = dateFromFormat(locale, format, nextValue);

          if (!parsedDate) {
            setErrorState(true);
            selectCalendarDate(0);
            return;
          }

          setErrorState(false);
          selectCalendarDate(parsedDate.valueOf());
          break;
        }
        case "multiple": {
          const dates = nextValue.replaceAll(" ", "").split(",");
          const parsedDates = dates.map((_dateStr: string) =>
            dateFromFormat(locale, format, _dateStr)
          );

          if (parsedDates.some((date) => !date)) {
            setErrorState(true);
            return;
          }

          parsedDates.forEach((_dateVal) => {
            setErrorState(false);
            selectCalendarDate((_dateVal as Date).valueOf(), true);
          });

          break;
        }
      }
    }
  };

  const selectCalendarDate = useCallback(
    (date: number, fromInput?: boolean) => {
      let nextValue: DatePickerValue = mode === "multiple" ? [] : 0;

      setValue((prevValue) => {
        const previous =
          prevValue !== undefined ? prevValue : mode === "multiple" ? [] : 0;
        let updatedValue: DatePickerValue = previous;

        switch (mode) {
          case "single":
            if (date <= 0) {
              updatedValue = 0;
            } else {
              updatedValue =
                typeof previous === "number" && date === previous ? 0 : date;
            }
            break;
          case "multiple":
            {
              const currentValue = Array.isArray(previous) ? previous : [];
              if (date === -1) {
                updatedValue = [];
              } else if (
                currentValue.find((element: number) => element === date)
              ) {
                if (!fromInput) {
                  updatedValue = currentValue.filter(
                    (element: number) => element !== date
                  );
                }
              } else {
                updatedValue = [...currentValue, date];
              }
            }

            break;
        }

        nextValue = updatedValue;
        return updatedValue;
      });

      if (typeof onChange === "function") onChange(nextValue);
    },
    [mode, onChange]
  );

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

    if (Array.isArray(value)) {
      const formatted = value
        .filter((val): val is number => typeof val === "number" && val > 0)
        .map(formatTimestamp)
        .filter(Boolean);
      return formatted.length ? formatted.join(", ") : "";
    }

    if (typeof value === "number" && value > 0) {
      const formatted = formatTimestamp(value);
      return formatted || "";
    }

    return "";
  }, [value, dateFormatter]);

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
  }, [mode, calendarProps, value, locale, selectCalendarDate]);

  return (
    <Dropdown
      className={clsx("datepicker-wrapper", className)}
      disabled={disabled}
      onChangeToggleMenu={(state: boolean) => setShowCalendar(state)}
      keepShown={mode === "multiple"}
    >
      <DropdownButton className="datepicker-container">
        <Input
          label={label}
          error={errorState}
          name={name}
          className="datepicker"
          placeholder={placeholder}
          type="text"
          value={errorState ? inputText : formattedInputValue}
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
      </DropdownButton>
      <DropdownMenu>{calendar}</DropdownMenu>
    </Dropdown>
  );
};

export default DatePicker;
