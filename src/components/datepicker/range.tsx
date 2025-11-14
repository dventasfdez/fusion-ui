import React, {
  ChangeEvent,
  HTMLAttributes,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Calendar, { CalendarProps } from "../calendar/calendar";
import Dropdown, { DropdownButton, DropdownMenu } from "../dropdown/dropdown";
import { useDevice } from "../../hooks/useDevice/useDevice";
import Input from "../input/input";
import Icon from "../icon/icon";
import clsx from "clsx";
import {
  dateFromFormat,
  getFormatStr,
  getLocalDateFromUTCDate,
} from "@/helpers/calendar/calendarHelper";

export type DatePickerRangeProps = HTMLAttributes<HTMLDivElement> & {
  name: string;
  locale: Intl.LocalesArgument;
  /**
   * Set the value of date picker
   */
  defaultValue?: number[];
  /**
   * Change the date format to show the dates. This attribute also affects the way dates are entered in the different inputs.
   */
  format?: Intl.DateTimeFormatOptions;
  /**
   * Return the value of select
   */
  onChange?: (value: number[]) => void;
  label?: {
    start?: string;
    end?: string;
  };
  placeholder?: {
    start?: string;
    end?: string;
  };
  required?: {
    start?: boolean;
    end?: boolean;
  };
  readOnly?: {
    start?: boolean;
    end?: boolean;
  };
  disabled?: {
    start?: boolean;
    end?: boolean;
  };
  error?: {
    start?: boolean;
    end?: boolean;
  };
  calendar?: CalendarProps;
};

const RANGE_KEYS = ["start", "end"] as const;
type RangeKey = (typeof RANGE_KEYS)[number];

const isRangeKey = (value: string): value is RangeKey =>
  value === "start" || value === "end";

const DatePickerRange: React.FC<DatePickerRangeProps> = (
  props: DatePickerRangeProps
) => {
  const {
    name,
    className,
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
    calendar: calendarProps,

    defaultValue,
    onChange,

    ...rest
  } = props;

  const locale = useMemo<Intl.LocalesArgument>(() => {
    if (localeProp) return localeProp;
    if (typeof navigator !== "undefined") return navigator.language;
    return "en-US";
  }, [localeProp]);

  const placeholder = useMemo(() => {
    const fallback = getFormatStr(locale, format);
    return {
      start: placeholderProp?.start ?? fallback,
      end: placeholderProp?.end ?? fallback,
    };
  }, [placeholderProp, locale, format]);

  const { isMobile } = useDevice();

  const [value, setValue] = useState<number[]>(
    Array.isArray(defaultValue) ? [...defaultValue] : []
  );
  const [errorState, setErrorState] = useState<Record<RangeKey, boolean>>({
    start: !!error?.start,
    end: !!error?.end,
  });

  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  const [inputText, setInputText] = useState<Record<RangeKey, string>>({
    start: "",
    end: "",
  });

  useEffect(() => {
    if (Array.isArray(defaultValue)) {
      setValue([...defaultValue]);
    } else {
      setValue([]);
    }
    setInputText({ start: "", end: "" });
  }, [defaultValue]);

  useEffect(() => {
    if (typeof error?.start === "boolean" || typeof error?.end === "boolean") {
      setErrorState((prev) => ({
        start: typeof error?.start === "boolean" ? error?.start : prev.start,
        end: typeof error?.end === "boolean" ? error?.end : prev.end,
      }));
    }
  }, [error]);

  const dateFormatter = useMemo(
    () => new Intl.DateTimeFormat(locale, format),
    [locale, format]
  );

  const formattedValues = useMemo(() => {
    const startValue = value.length ? value[0] : undefined;
    const endValue = value.length > 1 ? value[1] : undefined;

    return {
      start: startValue
        ? dateFormatter.format(getLocalDateFromUTCDate(new Date(startValue)))
        : "",
      end: endValue
        ? dateFormatter.format(getLocalDateFromUTCDate(new Date(endValue)))
        : "",
    };
  }, [value, dateFormatter]);

  const displayValues = useMemo(() => {
    return {
      start:
        errorState.start && inputText.start
          ? inputText.start
          : formattedValues.start,
      end:
        errorState.end && inputText.end ? inputText.end : formattedValues.end,
    };
  }, [errorState, formattedValues, inputText]);

  const selectCalendarDate = useCallback(
    (
      date: number,
      fromInputs?: boolean,
      range?: RangeKey,
      e?: React.MouseEvent
    ) => {
      e?.stopPropagation();
      e?.nativeEvent.stopImmediatePropagation();

      let nextValue: number[] = [];

      setValue((prevValue) => {
        const currentRange = Array.isArray(prevValue) ? [...prevValue] : [];
        let updatedValue: number[] = currentRange;

        if (fromInputs) {
          if (date) {
            if (range === "start") {
              if (currentRange.length === 2) {
                const [, endDate] = currentRange;
                updatedValue =
                  endDate && endDate > date ? [date, endDate] : [date];
              } else {
                updatedValue = [date];
              }
            } else if (range === "end") {
              if (currentRange.length) {
                const startDate = currentRange[0];
                updatedValue =
                  startDate < date ? [startDate, date] : [Date.now(), date];
              } else {
                updatedValue = [Date.now(), date];
              }
            }
          } else if (range === "start") {
            updatedValue = currentRange.length > 1 ? [currentRange[1]] : [];
          } else if (range === "end") {
            updatedValue =
              currentRange.length > 1 ? [currentRange[0]] : currentRange;
          }
        } else if (currentRange.length) {
          const [startDate, endDate] = currentRange;
          if (currentRange.length === 2) {
            if (date === startDate) {
              updatedValue = endDate ? [endDate] : [];
            } else if (date === endDate) {
              updatedValue = [startDate];
            } else {
              updatedValue = [date];
            }
          } else if (startDate !== date) {
            updatedValue =
              startDate < date ? [startDate, date] : [date, startDate];
          } else {
            updatedValue = [];
          }
        } else {
          updatedValue = [date];
        }

        nextValue = updatedValue;
        return updatedValue;
      });

      if (typeof onChange === "function") onChange(nextValue);
    },
    [onChange]
  );

  const onChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.currentTarget?.name) return;
      const namePart = e.currentTarget.name.split(".")[1];
      if (!isRangeKey(namePart)) return;

      const rawValue = e.currentTarget.value;

      setInputText((prev) => ({ ...prev, [namePart]: rawValue }));

      if (!rawValue.trim()) {
        setErrorState((prev) => ({ ...prev, [namePart]: false }));
        selectCalendarDate(0, true, namePart);
        return;
      }

      const parsedDate = dateFromFormat(locale, format, rawValue);

      if (!parsedDate) {
        setErrorState((prev) => ({ ...prev, [namePart]: true }));
        return;
      }

      if (
        namePart === "end" &&
        value.length &&
        value[0] &&
        value[0] > parsedDate.valueOf()
      ) {
        setErrorState((prev) => ({ ...prev, end: true }));
        return;
      }

      setErrorState((prev) => ({ ...prev, [namePart]: false }));
      selectCalendarDate(parsedDate.valueOf(), true, namePart);
    },
    [format, locale, selectCalendarDate, value]
  );

  const onClickInputRange = (e: MouseEvent<HTMLInputElement>) => {
    if (showCalendar) e.stopPropagation();
  };

  const calendar = useMemo(() => {
    const hasSelection =
      Array.isArray(value) &&
      value.length > 0 &&
      !(errorState.start && errorState.end);

    const selectedDates = hasSelection ? value : [];
    const defaultDate = hasSelection ? value[0] : undefined;
    const overrides = calendarProps ?? {};

    return (
      <Calendar
        {...overrides}
        id={`datepicker-calendar-range`}
        className={clsx("datepicker-calendar-wrapper", overrides.className)}
        selectedDates={selectedDates}
        onSelectDate={(date: number, e?: React.MouseEvent) =>
          selectCalendarDate(date, false, undefined, e)
        }
        defaultDate={defaultDate}
        locale={locale}
        range={true}
      />
    );
  }, [
    calendarProps,
    errorState.end,
    errorState.start,
    locale,
    selectCalendarDate,
    value,
  ]);

  return (
    <Dropdown
      {...rest}
      className={clsx("datepicker-wrapper", className)}
      onChangeToggleMenu={(state: boolean) => setShowCalendar(state)}
      disabled={disabled?.start && disabled?.end}
    >
      <DropdownButton className="datepicker-container_range">
        {RANGE_KEYS.map((key) => (
          <Input
            key={key}
            label={label?.[key]}
            error={errorState[key]}
            name={`${name}.${key}`}
            className="datepicker"
            placeholder={placeholder[key]}
            type="text"
            value={displayValues[key]}
            required={required?.[key]}
            disabled={disabled?.[key]}
            readOnly={readOnly?.[key]}
            onChange={onChangeInput}
            onClick={onClickInputRange}
            icon={!isMobile ? <Icon name="calendar_today" /> : undefined}
          />
        ))}
      </DropdownButton>
      <DropdownMenu>{calendar}</DropdownMenu>
    </Dropdown>
  );
};

export default DatePickerRange;
