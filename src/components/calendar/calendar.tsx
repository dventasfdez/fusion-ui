import React, { HTMLAttributes, useEffect, useRef, useState } from "react";
// import { DateTime } from "luxon";
import CalendarMonth from "./calendarMonth";
import CalendarYears from "./calendarYears";
import IconButton from "../button/icon";
import Button from "../button/button";
import Icon from "../icon/icon";
import { useDevice } from "@/hooks/useDevice/useDevice";

export type CalendarProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Locale option to show the days on language as user wants
   */
  locale?: Intl.LocalesArgument;
  /**
   * Show the month of the default date
   */
  defaultDate?: number;
  /**
   * Disable days in calendar
   */
  disabledDates?: number[];
  /**
   * Selected days in calendar
   */
  selectedDates?: number[];
  /**
   * In case the selected dates build up a range, intermediate days of those two dates
   */
  range?: boolean;
  /**
   * Minimum date to be able to select
   */
  minDate?: number;
  /**
   * Maximum date to be able to select
   */
  maxDate?: number;
  /**
   * On change function when click another day
   */
  onSelectDate?: (date: number, e?: React.MouseEvent) => void;
};

const Calendar: React.FC<CalendarProps> = ({
  id,
  locale = new Intl.Locale(
    typeof window !== "undefined" ? navigator.language : "en-US"
  ),
  defaultDate,
  disabledDates,
  selectedDates,
  range,
  minDate,
  maxDate,
  onSelectDate,
  className,
  ...props
}) => {
  const { isMobile } = useDevice();
  const calendarRef = useRef<HTMLDivElement>(null);
  const [defaultDateState, setDefaultDateState] = useState<number>(
    defaultDate ? defaultDate : Date.now()
  );

  const [showYears, setShowYears] = useState(false);

  const toggleShowYears = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setShowYears(!showYears);
  };

  const updateDisplayedDate = (newDisplayedDate: number) => {
    setDefaultDateState(newDisplayedDate);
  };

  const onSelectYear = (
    year: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const d = new Date(defaultDateState);
    d.setUTCDate(1);
    d.setUTCFullYear(year);
    d.setUTCHours(0, 0, 0, 0);
    updateDisplayedDate(d.getTime());
    setShowYears(false);
  };

  const selectNextMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const d = new Date(defaultDateState);
    d.setUTCDate(1);
    d.setUTCMonth(d.getUTCMonth() + 1);
    d.setUTCHours(0, 0, 0, 0);
    updateDisplayedDate(d.getTime());
  };

  const selectPrevMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const d = new Date(defaultDateState);
    d.setUTCDate(1);
    d.setUTCMonth(d.getUTCMonth() - 1);
    d.setUTCHours(0, 0, 0, 0);
    updateDisplayedDate(d.getTime());
  };

  const renderNavigationBar = () => {
    const _actualDate = new Intl.DateTimeFormat(locale, {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(defaultDateState);

    return (
      <div className="calendar-navigation">
        <IconButton
          name="chevron_left"
          aria-label="Previous month"
          appearance="text"
          size="small"
          type="button"
          data-testid={
            props && props["data-testid"]
              ? `${props["data-testid"]}-btn_prev`
              : undefined
          }
          onClick={selectPrevMonth}
        />
        <Button
          type="button"
          appearance="text"
          size="small"
          data-testid={
            props && props["data-testid"]
              ? `${props["data-testid"]}-nav-label`
              : undefined
          }
          className="calendar-navigation-label"
          onClick={toggleShowYears}
        >
          {`${_actualDate}`}
          <Icon name={showYears ? "arrow_drop_up" : "arrow_drop_down"} />
        </Button>
        <IconButton
          name="chevron_right"
          aria-label="Next month"
          appearance="text"
          size="small"
          type="button"
          data-testid={
            props && props["data-testid"]
              ? `${props["data-testid"]}-btn_next`
              : undefined
          }
          onClick={selectNextMonth}
        />
      </div>
    );
  };

  useEffect(() => {
    if (defaultDate && defaultDate !== defaultDateState) {
      setDefaultDateState(defaultDate);
    }
  }, [defaultDate]);

  return (
    <div
      id={id}
      key={id}
      ref={calendarRef}
      className={`calendar ${className || ""}`}
      {...props}
    >
      {renderNavigationBar()}
      {showYears ? (
        <CalendarYears
          year={new Date(defaultDateState).getFullYear()}
          onSelectYear={onSelectYear}
          minDate={minDate}
          maxDate={maxDate}
        />
      ) : (
        <CalendarMonth
          locale={locale}
          date={defaultDateState}
          month={new Date(defaultDateState).getUTCMonth()}
          selectedDates={selectedDates}
          range={range}
          disabledDates={disabledDates}
          minDate={minDate}
          maxDate={maxDate}
          onSelectDate={onSelectDate}
        />
      )}
    </div>
  );
};

export default Calendar;
